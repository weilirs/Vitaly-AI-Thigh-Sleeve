import os
import time
import numpy as np
from datetime import datetime

from firebase_connect import db
from my_signal_processing_module import (
    load_emg_data,
    load_accelerometer_data,
    process_emg_acc_signals
)
from v_main.local_storage import init_db, insert_result, get_unsynced, mark_synced

init_db()  

def cleanup_user_data(user_id: str):
    user_ref = db.collection("users").document(user_id)
    sessions_stream = user_ref.collection("sessions").stream()

    sub_colls = ["muscle_activation", "muscle_fatigue", "force_velocity", "gait_metrics", "processed_results"]
    deleted_count = 0

    for sess_snap in sessions_stream:
        sess_ref = sess_snap.reference
        for sc in sub_colls:
            docs = sess_ref.collection(sc).stream()
            for d in docs:
                d.reference.delete()
                deleted_count += 1
        sess_ref.delete()
        print(f"Deleted session: {sess_snap.id}")

    print(f"✅ Cleanup done! Total {deleted_count} docs removed under user '{user_id}'.")

def determine_status(activation_val: float) -> str:
    if activation_val < 0.4:
        return "Warm-up"
    elif activation_val < 0.8:
        return "Plateau"
    else:
        return "Over-activation"

def simulate_realtime_processing(
    user_id: str,
    session_id: str,
    emg_file: str,
    acc_file: str,
    fs_emg=2000,
    fs_acc=200,
    overlap_ratio=0.2,
    real_interval_sec=2.0
):
    print(f"=== Start processing {emg_file} & {acc_file} => {session_id} ===")

    emg_data = load_emg_data(emg_file)
    acc_data = load_accelerometer_data(acc_file)

    if emg_data.size == 0 or acc_data.size == 0:
        print(f"❌ Skipped empty: {emg_file} or {acc_file}")
        return

    window_size = min(2 * fs_emg, emg_data.shape[0] // 5)
    step_size = int(window_size * (1 - overlap_ratio))
    num_windows = (emg_data.shape[0] - window_size) // step_size + 1
    nfft_emg = max(2048, window_size)
    nfft_acc = nfft_emg
    fatigue_threshold = 0

    ch_index = 0
    emg_signal = emg_data[:, ch_index]
    if acc_data.shape[1] > ch_index:
        acc_signal = acc_data[:, ch_index]
    else:
        acc_signal = np.zeros_like(emg_signal)

    results, final_activation, final_fatigue_score = process_emg_acc_signals(
        emg_signal,
        acc_signal,
        fs_emg,
        fs_acc,
        num_windows,
        window_size,
        step_size,
        nfft_emg,
        nfft_acc,
        fatigue_threshold
    )

    activation_arr = results["activation"]
    fatigue_arr = results["fatigue_index"]
    force_arr = results["force"]
    velocity_arr = results["velocity"]
    power_arr = results["power_output"]

    n_windows = len(activation_arr)

    for i in range(n_windows):
        now_ts = datetime.utcnow().isoformat()  
        local_rec = {
            'session_id': session_id,
            'timestamp': now_ts,
            'muscle_fatigue': float(fatigue_arr[i]),
            'muscle_activation': float(activation_arr[i]),
            'force': float(force_arr[i]),
            'velocity': float(velocity_arr[i]),
            'power_output': float(power_arr[i]),
        }
        insert_result(local_rec)

        doc_activation = {
            "time": now_ts,
            "Quadriceps_activation": float(activation_arr[i]),
            "Average_activation": float(activation_arr[i]),
            "status": determine_status(activation_arr[i]),
        }
        db.collection("users").document(user_id)\
          .collection("sessions").document(session_id)\
          .collection("muscle_activation").add(doc_activation)

        doc_fatigue = {
            "time": now_ts,
            "Quadriceps_fatigue_level": float(fatigue_arr[i]),
        }
        db.collection("users").document(user_id)\
          .collection("sessions").document(session_id)\
          .collection("muscle_fatigue").add(doc_fatigue)

        doc_force = {
            "time": now_ts,
            "Quadracept_force_now": float(force_arr[i]),
            "Current_velocity": float(velocity_arr[i]),
            "power_output": float(power_arr[i]),
        }
        db.collection("users").document(user_id)\
          .collection("sessions").document(session_id)\
          .collection("force_velocity").add(doc_force)

        print(f"[window {i+1}/{n_windows}] Activation={activation_arr[i]:.3f}, Fatigue={fatigue_arr[i]:.3f}")
        time.sleep(real_interval_sec)

    print(f"✅ Done: {session_id}, final_activation={final_activation}, final_fatigue={final_fatigue_score}\n")

def simulate_batch_files(user_id: str, emg_dir: str, acc_dir: str):
    emg_files = sorted([f for f in os.listdir(emg_dir) if f.endswith(".txt")])
    if not emg_files:
        print(f"❌ No .txt in {emg_dir}, skip.")
        return

    for emg_file in emg_files:
        base_name = os.path.splitext(emg_file)[0]  # T1
        acc_file = base_name + ".txt"
        full_emg_path = os.path.join(emg_dir, emg_file)
        full_acc_path = os.path.join(acc_dir, acc_file)

        if not os.path.exists(full_acc_path):
            print(f"❌ Acc file not found for {emg_file}, skip.")
            continue

        session_id = f"session_{base_name}"
        simulate_realtime_processing(
            user_id=user_id,
            session_id=session_id,
            emg_file=full_emg_path,
            acc_file=full_acc_path
        )


def sync_to_firebase(user_id: str):
    rows = get_unsynced()
    print(f"Found {len(rows)} unsynced records to sync.")
    for row in rows:
        """
        row: (id, session_id, timestamp, muscle_fatigue, muscle_activation, force, velocity, power_output)
        """
        row_id = row[0]
        session_id = row[1]
        timestamp = row[2]
        muscle_fatigue = row[3]
        muscle_activation = row[4]
        force = row[5]
        velocity = row[6]
        power_output = row[7]
        doc_data = {
            "time": timestamp,
            "muscle_fatigue": muscle_fatigue,
            "muscle_activation": muscle_activation,
            "force": force,
            "velocity": velocity,
            "power_output": power_output
        }
        sess_ref = db.collection("users").document(user_id) \
                     .collection("sessions").document(session_id)
        sub_ref = sess_ref.collection("processed_results")
        sub_ref.document(row_id).set(doc_data)

        mark_synced(row_id)

    print("✅ Sync done. All local unsynced records are now in Firebase.")

def main():
    user_id = "user_001"
    emg_dir = "../data/V4/EMG"
    acc_dir = "../data/V4/Trajectories"
    simulate_batch_files(user_id, emg_dir, acc_dir)
    print("✅ All tasks done. You can check local_data.db and/or Firebase console now.")


if __name__ == "__main__":
    main()
