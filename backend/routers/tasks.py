from fastapi import APIRouter, HTTPException
from models.task import Task, TaskCreate, TaskStatus
from typing import List, Optional

router = APIRouter()

tasks_db: List[Task] = [
    Task(id=1, title="Design homepage mockup", project_id=1, status=TaskStatus.done),
    Task(id=2, title="Set up CI pipeline", project_id=1, status=TaskStatus.in_progress),
    Task(id=3, title="Write API docs", project_id=2, status=TaskStatus.todo),
    Task(id=4, title="Implement auth flow", project_id=2, status=TaskStatus.todo),
]
counter = 5

@router.get("/", response_model=List[Task])
def get_tasks(project_id: Optional[int] = None):
    if project_id:
        return [t for t in tasks_db if t.project_id == project_id]
    return tasks_db

@router.get("/{task_id}", response_model=Task)
def get_task(task_id: int):
    task = next((t for t in tasks_db if t.id == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/", response_model=Task, status_code=201)
def create_task(task: TaskCreate):
    global counter
    new_task = Task(id=counter, **task.dict())
    counter += 1
    tasks_db.append(new_task)
    return new_task

@router.patch("/{task_id}/status", response_model=Task)
def update_task_status(task_id: int, status: TaskStatus):
    task = next((t for t in tasks_db if t.id == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = status
    return task

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int):
    global tasks_db
    task = next((t for t in tasks_db if t.id == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    tasks_db = [t for t in tasks_db if t.id != task_id]
