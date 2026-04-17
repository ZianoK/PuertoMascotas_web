from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from database import get_db

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("/", response_model=List[schemas.ProductWithCategory])
def get_products(
    category_slug: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Obtiene productos activos con filtros opcionales:
    - category_slug: filtrar por categoría
    - search: búsqueda por nombre o descripción
    """
    query = db.query(models.Product).filter(models.Product.active == True)

    if category_slug:
        query = query.join(models.Category).filter(
            models.Category.slug == category_slug,
            models.Category.active == True
        )

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (models.Product.name.ilike(search_pattern)) |
            (models.Product.description.ilike(search_pattern))
        )

    products = query.all()
    return products


@router.get("/{product_id}", response_model=schemas.ProductWithCategory)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Obtiene el detalle de un producto por ID"""
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.active == True
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return product
