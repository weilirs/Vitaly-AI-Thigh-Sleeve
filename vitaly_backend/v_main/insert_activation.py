from firebase_connect import db
from datetime import datetime

user_id = "user123"
session_id = "session_001"

doc_ref = db.collection("users").document(user_id) \
    .collection("sessions").document(session_id) \
    .collection("muscle_activation").document()

doc_ref.set({
    "time": datetime.utcnow(),
    "Quadriceps_activation": 75.0,
    "Hamstring_activation": 68.0,
    "Average_activation": 71.5,
    "status": "Plateau",
    "external_load": 120.0,
    "internal_load": 90.0,
})
