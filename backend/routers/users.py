from fastapi import APIRouter, HTTPException
from models.user import User, UserCreate
from typing import List

router = APIRouter()

users_db: List[User] = [
    User(id=1, name="Alice Chen", email="alice@teamboard.dev"),
    User(id=2, name="Bob Martinez", email="bob@teamboard.dev"),
    User(id=3, name="Carol Smith", email="carol@teamboard.dev"),
]
counter = 4

@router.get("/", response_model=List[User])
def get_users():
    return users_db

@router.get("/{user_id}", response_model=User)
def get_user(user_id: int):
    user = next((u for u in users_db if u.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=User, status_code=201)
def create_user(user: UserCreate):
    global counter
    existing = next((u for u in users_db if u.email == user.email), None)
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")
    new_user = User(id=counter, **user.dict())
    counter += 1
    users_db.append(new_user)
    return new_user
