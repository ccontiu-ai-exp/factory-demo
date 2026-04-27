from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Project(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    created_at: datetime = datetime.now()

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
