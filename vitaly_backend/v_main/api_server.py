from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/latest")
def get_latest_metrics():
    conn = sqlite3.connect("local_data.db")
    cursor = conn.cursor()
    cursor.execute("""
        SELECT session_id, timestamp, muscle_fatigue, muscle_activation, force,
               velocity, power_output, firing_rate, intensity, work_ratio
        FROM processed_results
        ORDER BY rowid DESC LIMIT 1
    """)
    row = cursor.fetchone()
    conn.close()
    if row:
        return {
            "session_id": row[0],
            "timestamp": row[1],
            "muscle_fatigue": row[2],
            "muscle_activation": row[3],
            "force": row[4],
            "velocity": row[5],
            "power_output": row[6],
            "firing_rate": row[7],
            "intensity": row[8],
            "work_ratio": row[9],
        }
    else:
        return {"error": "No data found"}

