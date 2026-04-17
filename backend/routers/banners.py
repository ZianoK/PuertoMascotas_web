from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List
import shutil
import os
from uuid import uuid4

import schemas
import models
from database import get_db

router = APIRouter(tags=["banners"])

# Ruta local donde se guardan las imgs
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/api/banners", response_model=List[schemas.Banner])
def get_banners(db: Session = Depends(get_db)):
    return db.query(models.Banner).filter(models.Banner.active == True).order_by(models.Banner.created_at.desc()).all()


@router.post("/admin/banners")
async def upload_banner(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="Formato de imagen no soportado")
    
    # Generar un nombre único para evitar colisiones
    ext = file.filename.split(".")[-1]
    filename = f"banner_{uuid4().hex}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    # Guardar en disco
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # La url pública para el frontend apuntará a statics de FastAPI
    # El archivo main.py deberá tener StaticFiles('/uploads', directory='uploads')
    image_url = f"/uploads/{filename}"
    
    new_banner = models.Banner(image_url=image_url, title=file.filename)
    db.add(new_banner)
    db.commit()
    db.refresh(new_banner)
    
    return new_banner


@router.delete("/admin/banners/{id}")
def delete_banner(id: int, db: Session = Depends(get_db)):
    banner = db.query(models.Banner).filter(models.Banner.id == id).first()
    if not banner:
        raise HTTPException(status_code=404, detail="Banner no encontrado")
        
    # Marcar inactivo (Soft delete es mejor, pero borraremos físico si queremos optimizar)
    # db.delete(banner)
    banner.active = False
    db.commit()
    return {"message": "Banner eliminado"}
