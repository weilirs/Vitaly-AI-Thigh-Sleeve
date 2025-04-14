import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from scipy.signal import welch, windows

def moving_average(data, window_size=10):
    if len(data) == 0 or isinstance(data[0], np.ndarray):
        return np.array([])
    return np.convolve(data, np.ones(window_size) / window_size, mode='same')

def compute_muscle_activation(segment, max_value):
    return np.sqrt(np.mean(segment**2)) / (max_value + np.finfo(float).eps) if len(segment) > 0 else 0

def compute_muscle_intensity(segment):
    return np.sqrt(np.mean(segment**2)) if len(segment) > 0 else 0

def compute_firing_rate(segment):
    return np.sum(np.abs(np.diff(np.sign(segment)))) / (2 * len(segment)) if len(segment) > 0 else 0

def compute_fatigue_index(initial_mnf, current_mnf, fatigue_threshold):
    return (initial_mnf - current_mnf) / (max(initial_mnf - fatigue_threshold, np.finfo(float).eps))

def compute_muscle_force(segment):
    rms_value = np.sqrt(np.mean(segment**2)) if len(segment) > 0 else 0
    return rms_value ** 2

def compute_velocity(acceleration_data, sampling_rate):
    return np.cumsum(acceleration_data, axis=0) / sampling_rate if acceleration_data.size > 0 else np.array([])

def compute_power_output(segment, velocity):
    return np.sqrt(np.mean(segment**2)) * np.mean(velocity) if len(segment) > 0 and len(velocity) > 0 else 0

def compute_work_ratio(iemg_value, power_output):
    return iemg_value / max(power_output, np.finfo(float).eps) if power_output != 0 else 0

def load_emg_data(filename):
    data = np.loadtxt(filename, delimiter='\t', skiprows=1)
    return data[:, [1, 4, 5, 8]] if data.size > 0 else np.array([])

def load_accelerometer_data(filename):
    data = np.loadtxt(filename, delimiter='\t', skiprows=1)
    return data[:, list(range(19, 28)) + list(range(46, 56))] if data.size > 0 else np.array([])

def process_emg_acc_signals(
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
):
    start_idx = 0
    initial_mnf = None
    results = {
        "activation": [], 
        "intensity": [], 
        "force": [], 
        "fatigue_index": [],
        "firing_rate": [], 
        "power_output": [], 
        "work_ratio": [], 
        "velocity": []
    }

    for _ in range(num_windows):
        if start_idx + window_size > len(emg_signal):
            break
        
        emg_segment = emg_signal[start_idx : start_idx + window_size]
        acc_segment = acc_signal[start_idx : start_idx + window_size]
        
        max_value = np.max(np.abs(emg_signal)) if len(emg_signal) > 0 else 1

        if len(emg_segment) > 0:
            freqs, power_spectrum = welch(
                emg_segment, fs_emg, 
                window=windows.hamming(window_size), 
                nperseg=window_size, 
                noverlap=int(0.2 * window_size), 
                nfft=nfft_emg
            )
            mnf_value = np.sum(freqs * power_spectrum) / np.sum(power_spectrum) if len(power_spectrum) > 0 else 0
        else:
            mnf_value = 0

        if initial_mnf is None:
            initial_mnf = mnf_value
        
        iemg_value = np.sum(np.abs(emg_segment)) if len(emg_segment) > 0 else 0
        velocity = compute_velocity(acc_segment, fs_acc)
        results["velocity"].append(np.mean(velocity) if len(velocity) > 0 else 0)
        
        results["activation"].append(compute_muscle_activation(emg_segment, max_value))
        results["intensity"].append(compute_muscle_intensity(emg_segment))
        results["force"].append(compute_muscle_force(emg_segment))
        results["fatigue_index"].append(compute_fatigue_index(initial_mnf, mnf_value, fatigue_threshold))
        results["firing_rate"].append(compute_firing_rate(emg_segment))
        
        power_out = compute_power_output(emg_segment, velocity)
        results["power_output"].append(power_out)
        results["work_ratio"].append(compute_work_ratio(iemg_value, power_out))
        
        start_idx += step_size
    
    for key in results:
        arr = np.array(results[key])
        if len(arr) > 0 and isinstance(arr[0], (int, float, np.number)):
            results[key] = moving_average(arr)
        else:
            results[key] = arr

    final_activation = results["activation"][-1] * 100 if len(results["activation"]) else 0
    final_fatigue_score = results["fatigue_index"][-1] * 100 if len(results["fatigue_index"]) else 0

    return results, final_activation, final_fatigue_score

def normalize_time(time_column):
    init_value = np.min(time_column)
    fin_value = np.max(time_column)
    m = (100 - 0) / (fin_value - init_value)
    b = 0 - m * init_value
    return time_column * m + b

def plot_raw_data(filename, data_name, columns, labels=None):
    data = pd.read_csv(filename, delimiter='\t', skiprows=1)
    time_column = data.iloc[:, 0].values
    new_time = normalize_time(time_column)
    selected_data = data.iloc[:, columns].values

    if labels is None:
        labels = [f'Signal_{i+1}' for i in range(len(columns))]

    colors = plt.cm.jet(np.linspace(0, 1, len(columns)))

    plt.figure(figsize=(12, 6))
    for i in range(len(columns)):
        plt.plot(new_time, selected_data[:, i], color=colors[i], label=labels[i])

    plt.xlabel('Normalized Time (0 to 100)')
    plt.ylabel(f'{data_name} Data')
    plt.title(f'{data_name} Signal Data with Normalized Time')
    plt.legend()
    plt.grid()
    plt.show()

def plot_results(results, time_stamps, num_channels):
    metrics = [
        "Muscle Activation", "Muscle Intensity", "Muscle Firing Rate", 
        "Muscle Fatigue Index", "Muscle Force", "Power Output", 
        "Muscle Work Ratio", "Velocity"
    ]
    data_to_plot = [
        results["activation"], results["intensity"], results["firing_rate"],
        results["fatigue_index"], results["force"], results["power_output"],
        results["work_ratio"], results["velocity"]
    ]
    
    for metric_idx, metric in enumerate(metrics):
        plt.figure(figsize=(14, 8))
        plt.suptitle(f'{metric} Across Channels', fontsize=16)
        
        for ch in range(num_channels):
            plt.subplot((num_channels + 1) // 2, 2, ch + 1)
            plt.plot(time_stamps, data_to_plot[metric_idx], 'r', linewidth=1.5)
            plt.xlabel("Time (s)")
            plt.ylabel(metric)
            plt.title(f"Channel {ch+1}")
            plt.grid()
        
        plt.show()
