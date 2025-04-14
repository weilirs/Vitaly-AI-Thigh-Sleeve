# Vitaly AI Fitness App

## Project Overview
Vitaly is an AI-driven fitness analytics platform designed to deliver real-time biometric insights and personalized coaching. The app integrates advanced signal processing, local data caching, and cloud synchronization via Firebase. This README provides comprehensive instructions for developers, including setup for both backend and frontend components.

## Project Structure
```
vitaly_backend/
├── v_main/
│   ├── api_server.py             # FastAPI server providing API endpoints
│   ├── realtime_processor.py     # Real-time biometric data processor
│   ├── local_storage.py          # SQLite database handler
│   ├── firebase_connect.py       # Firebase integration
│   ├── my_signal_processing_module.py # Signal processing algorithms
│   ├── insert_activation.py      # Database insertion utility
│   ├── read_activation.py        # Database read utility
│   ├── generate_synthetic_data.py # Test data generation script
│   ├── init_structure.py         # Database initialization script
│   ├── requirements.txt          # Python dependencies
│   └── local_data.db             # Local SQLite database
└── vitaly-ai-firebase-adminsdk.json # Firebase credentials

vitaly_frontend/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── App.tsx                   # Main React component
│   ├── main.tsx                  # Entry point
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── assets/react.svg
├── tailwind.config.js
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Backend Setup

### Prerequisites
- Python 3.10+
- SQLite
- Firebase project setup (service account)

### Setup Instructions

1. **Clone repository:**
```bash
git clone 
cd vitaly_backend/v_main
```

2. **Virtual Environment Setup:**
Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate
```

3. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

4. **Firebase Configuration:**
- Place your Firebase service account JSON (`vitaly-ai-firebase-adminsdk.json`) in the project root (`vitaly_backend/`).
- Ensure the path in `firebase_connect.py` correctly references your service account file:
```python
cred = credentials.Certificate('../vitaly-ai-firebase-adminsdk.json')
```

5. **Initialize Database:**
```bash
python init_structure.py
```

6. **Run Real-time Data Processor:**
Start the processor that continuously generates and processes data, caching it locally and syncing to Firebase:
```bash
python realtime_processor.py
```

7. **Start API Server:**
```bash
uvicorn api_server:app --reload
```

The API server will run at `http://localhost:8000`.

## Frontend Setup

### Prerequisites
- Node.js v18+
- npm

### Setup Instructions

1. **Clone repository:**
```bash
git clone
cd vitaly_frontend
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Run Frontend:**
```bash
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Current Features
- Real-time data processing and local caching
- Backend API with FastAPI (`/api/latest` endpoint)
- Frontend integration displaying metrics (muscle activation, fatigue, force, velocity)
- Data synchronization with Firebase
- Interactive AI coach component (Fitty)

## Current API Response Example
```json
{
  "session_id": "session_T7",
  "timestamp": "2025-04-12T03:59:18.627453",
  "muscle_fatigue": -0.0720,
  "muscle_activation": 0.0323,
  "force": 0.00007,
  "velocity": 0.0,
  "power_output": 0.0,
  "firing_rate": 0.0,
  "intensity": 0.0,
  "work_ratio": 0.0
}
```

## Future Development Roadmap

### Next Steps
1. **Continuous Data Stream:**
   - Enhance backend to generate realistic biometric data over time intervals continuously.

2. **Historical Data Management:**
   - Implement frontend capabilities to fetch and display historical data.

3. **Frontend Local Caching:**
   - Use IndexedDB for offline data caching and synchronization.

4. **Enhanced Firebase Integration:**
   - Real-time data synchronization for multi-device accessibility and cloud analytics.
   - When WIFI connection all the data can be displayed to users

5. **Performance Optimization:**
   - Optimize signal processing algorithms for improved performance and accuracy.

6. **Integrate AI Chatbot**

### Potential Improvements
- **Scalable Architecture:** Dockerize backend services for easy deployment.
- **Enhanced Security:** Secure API endpoints with authentication (JWT).
- **User Management:** Add Firebase Authentication for secure user access.
- **Detailed Analytics:** Expand metrics analysis and data visualization features.
