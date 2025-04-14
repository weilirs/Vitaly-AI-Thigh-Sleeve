from firebase_connect import db
from datetime import datetime

def init_user_session_structure(user_id, session_id):
    print("Creating user doc...")
    user_doc = db.collection("users").document(user_id)
    user_doc.set({
        "name": "Demo User",
        "age": 25,
        "weight": 70.0,
        "height": 175.0,
        "gender": "male",
        "BMI": 22.86
    })
    print("User doc created.")

    print("Creating session doc...")
    session_doc = user_doc.collection("sessions").document(session_id)
    session_doc.set({
        "session_start": datetime.utcnow(),
        "session_end": datetime.utcnow(),
        "created_at": datetime.utcnow()
    })
    print("Session doc created.")

    print("Creating subcollections...")
    for sub_collection in ["muscle_activation", "muscle_fatigue", "force_velocity", "gait_metrics"]:
        placeholder_ref = session_doc.collection(sub_collection).document("placeholder")
        placeholder_ref.set({
            "_init": True,
            "created_at": datetime.utcnow()
        })
        print(f"{sub_collection} -> placeholder created.")

    print(f"✅ Structure initialized for user {user_id}, session {session_id}")
if __name__ == "__main__":
    print("✅ Firebase Admin SDK initialized.")
    init_user_session_structure("user_001", "session_001")
