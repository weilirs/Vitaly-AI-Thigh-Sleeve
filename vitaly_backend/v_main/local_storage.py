# local_storage.py

import sqlite3
import os
import uuid

DB_PATH = "local_data.db"

def init_db():
    """
    初始化/创建 SQLite 数据库。只需在脚本启动时调用一次。
    """
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS processed_results (
        id TEXT PRIMARY KEY,
        session_id TEXT,
        timestamp TEXT,
        muscle_fatigue REAL,
        muscle_activation REAL,
        force REAL,
        velocity REAL,
        power_output REAL,
        firing_rate REAL,
        intensity REAL,
        work_ratio REAL,
        is_synced INTEGER DEFAULT 0
    )
    """)
    conn.commit()
    conn.close()

def insert_result(record):
    """
    将处理后的结果插入本地DB。
    record 例如:
    {
      'session_id': 'session_T1',
      'timestamp': '2025-03-25T12:00:00',
      'muscle_fatigue': 0.78,
      'muscle_activation': 0.65,
      'force': 123.45,
      'velocity': 1.23,
      'power_output': 45.6,
      'firing_rate': 12.3,
      'intensity': 0.9,
      'work_ratio': 0.77
    }
    """
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    row_id = str(uuid.uuid4())  # 生成一个随机ID
    c.execute("""
    INSERT INTO processed_results
    (id, session_id, timestamp, muscle_fatigue, muscle_activation, force, velocity, power_output, firing_rate, intensity, work_ratio, is_synced)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    """, (
        row_id,
        record['session_id'],
        record['timestamp'],
        record.get('muscle_fatigue', 0.0),
        record.get('muscle_activation', 0.0),
        record.get('force', 0.0),
        record.get('velocity', 0.0),
        record.get('power_output', 0.0),
        record.get('firing_rate', 0.0),
        record.get('intensity', 0.0),
        record.get('work_ratio', 0.0),
    ))
    conn.commit()
    conn.close()


def get_unsynced():
    """
    返回尚未同步到 Firebase 的所有记录 (is_synced=0)。
    """
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
    SELECT id, session_id, timestamp, muscle_fatigue, muscle_activation, force, velocity, power_output,
           firing_rate, intensity, work_ratio
    FROM processed_results WHERE is_synced=0
    """)
    rows = c.fetchall()
    conn.close()
    return rows

def mark_synced(row_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("UPDATE processed_results SET is_synced=1 WHERE id=?", (row_id,))
    conn.commit()
    conn.close()
