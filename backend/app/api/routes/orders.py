from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_db, require_restaurant_member
from app.models import MenuItem, Order, OrderItem, OrderStatus, Restaurant
from app.schemas.order import OrderResponse, PublicOrderCreate

router = APIRouter(tags=["Orders"])


def serialize_order(order: Order) -> OrderResponse:
    return OrderResponse(
        id=order.id, order_number=order.order_number, table_number=order.table_number,
        customer_name=order.customer_name, status=order.status, total=float(order.total),
        created_at=order.created_at,
        items=[
            OrderItemResponse(
                menu_item_id=i.menu_item_id, name=i.menu_item.name,
                quantity=i.quantity, unit_price=float(i.unit_price)
            ) for i in order.items
        ],
    )


from app.schemas.order import OrderItemResponse


@router.post("/restaurants/{slug}/orders", response_model=OrderResponse, status_code=201)
def create_public_order(slug: str, payload: PublicOrderCreate, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.slug == slug, Restaurant.is_active.is_(True)).first()
    if not restaurant:
        raise HTTPException(404, "Restaurant not found")

    ids = [x.menu_item_id for x in payload.items]
    menu_items = db.query(MenuItem).filter(
        MenuItem.restaurant_id == restaurant.id,
        MenuItem.id.in_(ids),
        MenuItem.is_available.is_(True)
    ).all()
    lookup = {m.id: m for m in menu_items}
    if len(lookup) != len(set(ids)):
        raise HTTPException(400, "One or more menu items are unavailable")

    order = Order(
        order_number=f"BF-{uuid4().hex[:8].upper()}",
        restaurant_id=restaurant.id,
        table_number=payload.table_number,
        customer_name=payload.customer_name,
        status=OrderStatus.PENDING,
        total=0,
    )
    db.add(order); db.flush()

    total = 0
    for row in payload.items:
        menu = lookup[row.menu_item_id]
        line_total = float(menu.price) * row.quantity
        total += line_total
        db.add(OrderItem(order_id=order.id, menu_item_id=menu.id, quantity=row.quantity, unit_price=menu.price))
    order.total = total
    db.commit()
    db.refresh(order)
    return serialize_order(
        db.query(Order).options(joinedload(Order.items).joinedload(OrderItem.menu_item)).get(order.id)
    )


@router.get("/orders", response_model=list[OrderResponse])
def list_orders(ctx=Depends(require_restaurant_member), db: Session = Depends(get_db)):
    _, membership = ctx
    orders = db.query(Order).options(joinedload(Order.items).joinedload(OrderItem.menu_item)).filter(
        Order.restaurant_id == membership.restaurant_id
    ).order_by(Order.created_at.desc()).limit(100).all()
    return [serialize_order(o) for o in orders]


@router.patch("/orders/{order_id}/status", response_model=OrderResponse)
def update_order_status(order_id: str, status: OrderStatus, ctx=Depends(require_restaurant_member), db: Session = Depends(get_db)):
    _, membership = ctx
    order = db.query(Order).options(joinedload(Order.items).joinedload(OrderItem.menu_item)).filter(
        Order.id == order_id, Order.restaurant_id == membership.restaurant_id
    ).first()
    if not order:
        raise HTTPException(404, "Order not found")
    if status == OrderStatus.PREPARING and order.status != OrderStatus.PENDING:
        raise HTTPException(400, "Only pending orders can move to preparing")
    if status == OrderStatus.SERVED and order.status != OrderStatus.PREPARING:
        raise HTTPException(400, "Only preparing orders can be served")
    order.status = status
    db.commit(); db.refresh(order)
    return serialize_order(order)
