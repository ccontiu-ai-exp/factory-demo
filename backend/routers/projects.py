from fastapi import APIRouter, HTTPException
from models.project import Project, ProjectCreate
from typing import List

router = APIRouter()

# In-memory store
projects_db: List[Project] = [
    Project(id=1, name="Website Redesign", description="Redesign the company website"),
    Project(id=2, name="Mobile App", description="Build a cross-platform mobile app"),
]
counter = 3

@router.get("/", response_model=List[Project])
def get_projects():
    return projects_db

@router.get("/{project_id}", response_model=Project)
def get_project(project_id: int):
    project = next((p for p in projects_db if p.id == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/", response_model=Project, status_code=201)
def create_project(project: ProjectCreate):
    global counter
    new_project = Project(id=counter, **project.dict())
    counter += 1
    projects_db.append(new_project)
    return new_project

@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: int):
    global projects_db
    project = next((p for p in projects_db if p.id == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    projects_db = [p for p in projects_db if p.id != project_id]
