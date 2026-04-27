# TeamBoard

A lightweight project and task management app. FastAPI backend + React frontend.

## Structure

```
teamboard/
├── backend/       # FastAPI REST API (Python)
└── frontend/      # React app (Vite)
```

## Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# API runs at http://localhost:8000
# Docs at http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

### Run Tests
```bash
cd backend
pytest tests/
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /projects/ | List all projects |
| POST | /projects/ | Create a project |
| GET | /projects/{id} | Get a project |
| DELETE | /projects/{id} | Delete a project |
| GET | /tasks/ | List tasks (optional ?project_id=) |
| POST | /tasks/ | Create a task |
| GET | /tasks/{id} | Get a task |
| PATCH | /tasks/{id}/status | Update task status |
| DELETE | /tasks/{id} | Delete a task |
| GET | /users/ | List users |
| POST | /users/ | Create a user |
| GET | /users/{id} | Get a user |
