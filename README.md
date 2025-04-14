# Vitaly AI Thigh Sleeve: Comprehensive Development Guide

## Introduction

Vitaly AI is an advanced, data-driven fitness analytics platform designed to track and visualize real-time biometric metrics, muscle activation, and fatigue data. It integrates sophisticated backend signal processing with an interactive frontend visualization to deliver actionable insights for optimizing athletic performance and injury prevention.

## Project Structure

The project is organized into two core repositories:

- **vitaly_backend**: Python-based backend responsible for signal processing, real-time data handling, local caching, and API services.
- **vitaly_frontend**: React and TypeScript-based frontend designed for intuitive data visualization and user interaction.

---

## Backend (`vitaly_backend`)

### Directory Structure

```
vitaly_backend/
├── v_main/
│   ├── api_server.py
│   ├── realtime_processor.py
│   ├── firebase_connect.py
│   ├── local_storage.py
│   ├── generate_synthetic_data.py
│   ├── my_signal_processing_module.py
│   ├── insert_activation.py
│   ├── read_activation.py
│   ├── init_structure.py
│   ├── local_data.db
│   └── requirements.txt
├── vitaly-ai-firebase-adminsdk.json
└── README.md
```

### Environment Setup

1. **Clone Repository:**
```bash
git clone 
cd vitaly_backend/v_main
```

2. **Create Virtual Environment:**

We highly recommend using a Python virtual environment to manage dependencies:

```bash
python3 -m venv vmm
source vmm/bin/activate
```

3. **Install Dependencies:**

```bash
pip install -r requirements.txt
```

### Backend Usage

1. **Initialize Local Database Structure:**

```bash
python init_structure.py
```

2. **Generate Synthetic Data (Optional):**

For initial testing purposes:

```bash
python generate_synthetic_data.py
```

3. **Run Real-Time Processor:**

This script simulates real-time data processing and caching:

```bash
python realtime_processor.py
```

4. **Launch API Server:**

Start the API server (FastAPI) locally:

```bash
uvicorn api_server:app --reload --host 0.0.0.0 --port 8000
```

Access API documentation at:

```
http://localhost:8000/docs
```

---

## Frontend (`vitaly_frontend`)

### Directory Structure

```
vitaly_frontend/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── vite-env.d.ts
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### Environment Setup

1. **Clone Repository:**
```bash
git clone 
cd vitaly_frontend
```

2. **Install Dependencies:**

```bash
npm install
```

### Frontend Usage

Start the development server locally:

```bash
npm run dev
```

Open the application at:

```
http://localhost:5173
```

Ensure the backend API server is running concurrently to fetch and display data properly.

---

## Current Project Status

- ✅ **Backend and Frontend API Integration:** Successfully connected; frontend fetches live metrics via backend.
- ✅ **Real-time Data Visualization:** Functional real-time rendering of muscle activation, fatigue scores, and force metrics using ECharts.
- ✅ **Local Caching Mechanism:** Backend caches real-time processed data in a local SQLite database.
- ✅ **Data Simulation:** Backend can simulate data processing with synthetic data generation for testing.

---

## Future Development Roadmap

### Immediate Next Steps

1. **Continuous Data Stream Integration:**
   - Enhance backend to produce continuous data streams simulating real-world use-cases.

2. **Historical Data Retrieval:**
   - Develop backend endpoints for retrieving historical session data and metrics.

3. **Frontend Data Caching (IndexedDB):**
   - Implement IndexedDB for frontend-side caching, enabling offline data visualization.

### Mid-Term Objectives

- **Enhanced Visualization Features:**
  - Implement comprehensive session comparison dashboards.
  - Include advanced analytics such as predictive modeling and AI-generated performance recommendations.

- **Robust API Enhancements:**
  - Improve API scalability and response handling for higher data throughput.

### Long-Term Goals

- **Cloud Integration:**
  - Finalize real-time synchronization with Firebase for robust cloud storage solutions.

- **Advanced Machine Learning Models:**
  - Integrate advanced ML/AI models for predictive analytics on muscle fatigue and injury prevention and integrate the Chatbot function.

---

## Optimization Suggestions

- Optimize backend signal processing algorithms for increased efficiency.
- Reduce frontend rendering latency with more efficient state management strategies (e.g., React Query).
- Expand unit and integration testing to ensure platform stability and reliability.

---
