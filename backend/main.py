from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from fastapi.staticfiles import StaticFiles

from database import engine, SessionLocal, Base
import models
from routers import products, categories, orders, admin, banners, webhooks

load_dotenv()


def create_tables():
    """Crea las tablas en la base de datos"""
    Base.metadata.create_all(bind=engine)


def migrate_db():
    """Agrega columnas nuevas a tablas existentes (idempotente)."""
    from sqlalchemy import text
    with engine.connect() as conn:
        for col, col_type in [("preference_id", "VARCHAR(200)"), ("mp_init_point", "VARCHAR(500)"), ("updated_at", "TIMESTAMPTZ")]:
            try:
                conn.execute(text(f"ALTER TABLE orders ADD COLUMN IF NOT EXISTS {col} {col_type}"))
                conn.commit()
            except Exception:
                pass


def seed_initial_data():
    """Crea datos iniciales si la base de datos está vacía"""
    db = SessionLocal()
    try:
        # Verificar si ya hay productos reales (activos)
        existing_products = db.query(models.Product).filter(models.Product.active == True).count()
        if existing_products > 0:
            print("Base de datos ya tiene productos, saltando seed...")
            return
        # Verificar si ya hay categorías
        existing_categories = db.query(models.Category).count()
        if existing_categories > 0:
            print("Base de datos ya tiene datos, saltando seed...")
            return

        print("Creando datos iniciales...")

        # Crear categorías
        categories_data = [
            {"name": "Perros - Alimento", "slug": "perros-alimento"},
            {"name": "Perros - Premios", "slug": "perros-premios"},
            {"name": "Gatos - Alimento", "slug": "gatos-alimento"},
            {"name": "Gatos - Premios", "slug": "gatos-premios"},
            {"name": "Veterinaria - Consultas", "slug": "veterinaria-consultas"},
            {"name": "Veterinaria - Tratamientos", "slug": "veterinaria-tratamientos"},
        ]

        categories = []
        for cat_data in categories_data:
            category = models.Category(**cat_data, active=True)
            db.add(category)
            categories.append(category)

        db.commit()

        # Crear 3 productos de ejemplo por categoría
        products_templates = [
            {
                "name": "Producto Ejemplo 1",
                "description": "Este es un producto de ejemplo. El cliente debe completar los datos reales.",
                "price": 0.0,
                "cost": 0.0,
                "stock": 0,
                "active": False
            },
            {
                "name": "Producto Ejemplo 2",
                "description": "Este es un producto de ejemplo. El cliente debe completar los datos reales.",
                "price": 0.0,
                "cost": 0.0,
                "stock": 0,
                "active": False
            },
            {
                "name": "Producto Ejemplo 3",
                "description": "Este es un producto de ejemplo. El cliente debe completar los datos reales.",
                "price": 0.0,
                "cost": 0.0,
                "stock": 0,
                "active": False
            }
        ]

        for category in categories:
            for i, template in enumerate(products_templates, 1):
                product = models.Product(
                    name=f"{category.name} - {template['name']}",
                    description=template['description'],
                    price=template['price'],
                    cost=template['cost'],
                    stock=template['stock'],
                    category_id=category.id,
                    active=template['active']
                )
                db.add(product)

        db.commit()
        print("Datos iniciales creados correctamente")

    except Exception as e:
        print(f"Error al crear datos iniciales: {e}")
        db.rollback()
    finally:
        db.close()


def seed_admin_user():
    """Crea el usuario admin por defecto si no existe"""
    from auth import hash_password
    db = SessionLocal()
    try:
        existing = db.query(models.AdminUser).first()
        if existing:
            return
        admin = models.AdminUser(
            email=os.getenv("ADMIN_EMAIL", "admin@puertomascotas.com"),
            hashed_password=hash_password(os.getenv("ADMIN_PASSWORD", "PuertoMascotas2026!")),
            name="Admin",
        )
        db.add(admin)
        db.commit()
        print(f"Admin user creado: {admin.email}")
    except Exception as e:
        print(f"Error al crear admin: {e}")
        db.rollback()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan para inicialización y limpieza"""
    # Startup
    create_tables()
    migrate_db()
    seed_initial_data()
    seed_admin_user()
    yield
    # Shutdown (si se necesita limpiar recursos)


app = FastAPI(
    title="Puerto Mascotas API",
    description="API para tienda de alimentos y veterinaria a domicilio",
    version="1.0.0",
    lifespan=lifespan
)

# Configurar CORS
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_url,
        "http://localhost:3000",
        "http://localhost:3001",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Incluir routers
app.include_router(admin.router)
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(orders.router)
app.include_router(banners.router)
app.include_router(webhooks.router)


@app.get("/")
def root():
    return {
        "message": "Puerto Mascotas API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
