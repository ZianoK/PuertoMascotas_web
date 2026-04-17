from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("/", response_model=schemas.OrderWithItems, status_code=201)
def create_order(order_data: schemas.OrderCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo pedido con sus items.
    Valida que los productos existan y tengan stock suficiente.
    """
    if not order_data.items:
        raise HTTPException(status_code=400, detail="El pedido debe tener al menos un item")

    total = 0.0

    # Validar productos y calcular total
    for item in order_data.items:
        product = db.query(models.Product).filter(
            models.Product.id == item.product_id,
            models.Product.active == True
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Producto con ID {item.product_id} no encontrado"
            )

        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para {product.name}. Disponible: {product.stock}"
            )

        total += item.unit_price * item.quantity

    # Crear orden
    db_order = models.Order(
        customer_name=order_data.customer_name,
        customer_phone=order_data.customer_phone,
        customer_address=order_data.customer_address,
        payment_method=order_data.payment_method,
        notes=order_data.notes,
        total=total,
        status="pendiente"
    )
    db.add(db_order)
    db.flush()

    # Crear items de la orden y actualizar stock
    for item in order_data.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=item.unit_price
        )
        db.add(db_item)

        # Reducir stock
        product = db.query(models.Product).filter(
            models.Product.id == item.product_id
        ).first()
        product.stock -= item.quantity

    db.commit()
    db.refresh(db_order)

    return db_order


@router.get("/{order_id}", response_model=schemas.OrderWithItems)
def get_order(order_id: int, db: Session = Depends(get_db)):
    """Obtiene el detalle de un pedido por ID"""
    order = db.query(models.Order).filter(models.Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    return order
