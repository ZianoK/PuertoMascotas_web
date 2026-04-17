from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("/", response_model=List[schemas.Category])
def get_categories(db: Session = Depends(get_db)):
    """Obtiene todas las categorías activas"""
    categories = db.query(models.Category).filter(models.Category.active == True).all()
    return categories
