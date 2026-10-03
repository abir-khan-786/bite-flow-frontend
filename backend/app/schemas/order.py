from datetime import datetime
from pydantic import BaseModel, Field

from app.models import OrderStatus


class OrderItemCreate(BaseModel):
    menu_item_id: str
    quantity: int = Field(gt=0, le=50)


class PublicOrderCreate(BaseModel):
    table_number: str = Field(min_length=1, max_length=50)
    customer_name: str = Field(min_length=1, max_length=120)
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderItemResponse(BaseModel):
    menu_item_id: str
    name: str
    quantity: int
    unit_price: float


class OrderResponse(BaseModel):
    id: str
    order_number: str
    table_number: str
    customer_name: str
    status: OrderStatus
    total: float
    created_at: datetime
    items: list[OrderItemResponse]
