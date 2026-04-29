from datetime import datetime
from fastapi.testclient import TestClient
import sys
sys.path.append("..")
from main import app

client = TestClient(app)

def test_ping():
    response = client.get("/ping")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert "timestamp" in body
    # Ensure timestamp is a valid ISO 8601 string
    datetime.fromisoformat(body["timestamp"])

def test_get_projects():
    response = client.get("/projects/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_project_not_found():
    response = client.get("/projects/9999")
    assert response.status_code == 404

def test_create_project():
    response = client.post("/projects/", json={"name": "Test Project", "description": "A test"})
    assert response.status_code == 201
    assert response.json()["name"] == "Test Project"

def test_get_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200

def test_get_tasks_by_project():
    response = client.get("/tasks/?project_id=1")
    assert response.status_code == 200
    for task in response.json():
        assert task["project_id"] == 1

def test_get_task_not_found():
    response = client.get("/tasks/9999")
    assert response.status_code == 404
