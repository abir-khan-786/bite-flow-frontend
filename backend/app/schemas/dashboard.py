from pydantic import BaseModel


class DashboardResponse(BaseModel):
    today_orders: int
    today_revenue: float
    active_tables: int
    pending_orders: int
