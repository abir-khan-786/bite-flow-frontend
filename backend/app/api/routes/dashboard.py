from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_restaurant_member
from app.models import Order, OrderStatus, RestaurantTable
from app.schemas.dashboard import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/overview", response_model=DashboardResponse)
def overview(ctx=Depends(require_restaurant_member), db: Session = Depends(get_db)):
    _, membership = ctx
    start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)

    q = db.query(Order).filter(Order.restaurant_id == membership.restaurant_id, Order.created_at >= start)
    today_orders = q.count()
    revenue = db.query(func.coalesce(func.sum(Order.total), 0)).filter(
        Order.restaurant_id == membership.restaurant_id,
        Order.created_at >= start,
        Order.status != OrderStatus.CANCELLED
    ).scalar()
    pending = db.query(Order).filter(
        Order.restaurant_id == membership.restaurant_id,
        Order.status.in_([OrderStatus.PENDING, OrderStatus.PREPARING])
    ).count()
    active_tables = db.query(RestaurantTable).filter(
        RestaurantTable.restaurant_id == membership.restaurant_id,
        RestaurantTable.is_active.is_(True)
    ).count()

    return DashboardResponse(
        today_orders=today_orders, today_revenue=float(revenue or 0),
        active_tables=active_tables, pending_orders=pending
    )
