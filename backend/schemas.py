from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str
    active: bool = True


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True


# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = 0.0
    original_price: Optional[float] = None
    cost: Optional[float] = 0.0
    stock: int = 0
    category_id: int
    image_url: Optional[str] = None
    active: bool = True


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProductWithCategory(Product):
    category: Category


# Banner Schemas
class BannerBase(BaseModel):
    image_url: str
    title: Optional[str] = None
    active: bool = True

class BannerCreate(BannerBase):
    pass

class Banner(BannerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Order Item Schemas
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float


class OrderItemCreate(OrderItemBase):
    pass


class OrderItem(OrderItemBase):
    id: int
    order_id: int

    class Config:
        from_attributes = True


class OrderItemWithProduct(OrderItem):
    product: Product


# Order Schemas
class OrderBase(BaseModel):
    customer_name: str
    customer_phone: str
    customer_address: str
    payment_method: str
    notes: Optional[str] = None


class OrderCreate(OrderBase):
    items: List[OrderItemCreate]


class Order(OrderBase):
    id: int
    total: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class OrderWithItems(Order):
    items: List[OrderItemWithProduct]
