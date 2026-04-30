from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func as sql_func
from typing import List
import models
import schemas
from database import get_db

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("/", response_model=List[schemas.CategoryWithCount])
def get_categories(db: Session = Depends(get_db)):
    """Obtiene categorías activas con conteo de productos activos"""
    results = (
        db.query(
            models.Category,
            sql_func.count(models.Product.id).label("product_count"),
        )
        .outerjoin(
            models.Product,
            (models.Product.category_id == models.Category.id)
            & (models.Product.active == True),
        )
        .filter(models.Category.active == True)
        .group_by(models.Category.id)
        .all()
    )

    categories = []
    for cat, count in results:
        cat_dict = {
            "id": cat.id,
            "name": cat.name,
            "slug": cat.slug,
            "active": cat.active,
            "product_count": count,
        }
        categories.append(cat_dict)

    return categories
