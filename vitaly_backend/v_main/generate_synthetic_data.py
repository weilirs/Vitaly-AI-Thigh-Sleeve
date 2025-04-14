# generate_synthetic_data.py

import os
import numpy as np

def generate_emg_data(
    duration_s=10.0,
    sampling_rate=2000,
    channels=["L_BF", "L_VL", "R_BF", "R_VL"],
    output_path="T1.txt"
):
    n_samples = int(duration_s * sampling_rate)
    time_array = np.linspace(0, duration_s, n_samples, endpoint=False)

    base_freq = 30.0
    amplitude = 0.02    
    noise_level = 0.005 
    num_channels = len(channels)

    emg_data = np.zeros((n_samples, num_channels))

    for ch_idx in range(num_channels):
        phase_shift = np.random.rand() * 2 * np.pi
        freq_shift = base_freq + np.random.randn() * 5.0
        sine_wave = amplitude * np.sin(2 * np.pi * freq_shift * time_array + phase_shift)
        noise = np.random.normal(0.0, noise_level, n_samples)
        ramp = np.linspace(1.0, 1.3, n_samples) - 1.0

        channel_data = sine_wave * ramp + noise
        emg_data[:, ch_idx] = channel_data
    time_col = time_array.reshape(-1, 1)
    all_data = np.hstack((time_col, emg_data))

    header_cols = ["Time"] + channels
    header_line = "\t".join(header_cols)

    np.savetxt(
        output_path,
        all_data,
        delimiter="\t",
        header=header_line,
        comments="",
        fmt="%.6f"
    )

    print(f"✅ EMG file saved: {output_path} (shape={all_data.shape})")


def generate_trajectory_data(
    duration_s=10.0,
    sampling_rate=200,
    columns=["RASISX","RASISY","RASISZ","LASISX","LASISY","LASISZ"],
    output_path="T1.txt"
):
    n_samples = int(duration_s * sampling_rate)
    time_array = np.linspace(0, duration_s, n_samples, endpoint=False)

    num_cols = len(columns)
    traj_data = np.zeros((n_samples, num_cols))

    for c_idx in range(num_cols):
        random_walk = np.cumsum(np.random.randn(n_samples) * 0.1)
        sine_wave = 5.0 * np.sin(2 * np.pi * 0.3 * time_array + np.random.rand()*2*np.pi)
        noise = np.random.randn(n_samples) * 0.5
        base_val = 600.0 + np.random.randn()*30
        trend = np.linspace(0, 20, n_samples)

        col_data = base_val + trend + random_walk + sine_wave + noise
        traj_data[:, c_idx] = col_data

    all_data = np.hstack((time_array.reshape(-1,1), traj_data))
    header_cols = ["Time"] + columns
    header_line = "\t".join(header_cols)

    np.savetxt(
        output_path,
        all_data,
        delimiter="\t",
        header=header_line,
        comments="",
        fmt="%.3f"
    )

    print(f"✅ Trajectories file saved: {output_path} (shape={all_data.shape})")


def main():
    emg_dir = "../data/V4/EMG_synthetic"
    traj_dir = "../data/V4/Trajectories_synthetic"

    os.makedirs(emg_dir, exist_ok=True)
    os.makedirs(traj_dir, exist_ok=True)
    n_files = 3

    for i in range(1, n_files+1):
        emg_filename = f"T{i}.txt"
        traj_filename = f"T{i}.txt"
        emg_path = os.path.join(emg_dir, emg_filename)
        traj_path = os.path.join(traj_dir, traj_filename)
        generate_emg_data(
            duration_s=10.0,
            sampling_rate=2000,
            channels=["L_BF","L_VL","R_BF","R_VL"],
            output_path=emg_path
        )
        generate_trajectory_data(
            duration_s=10.0,
            sampling_rate=200,
            columns=["RASISX","RASISY","RASISZ","LASISX","LASISY","LASISZ"],
            output_path=traj_path
        )

    print("✅ All synthetic files generated!")


if __name__ == "__main__":
    main()
