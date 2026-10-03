from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_restaurant_member
from app.models import Category, MenuItem, Restaurant
from app.schemas.menu import CategoryCreate, CategoryResponse, MenuItemCreate, MenuItemResponse

router = APIRouter(tags=["Menu"])


@router.get("/restaurants/{slug}/menu", response_model=list[MenuItemResponse])
def public_menu(slug: str, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.slug == slug, Restaurant.is_active.is_(True)).first()
    if not restaurant:
        raise HTTPException(404, "Restaurant not found")
    items = db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant.id, MenuItem.is_available.is_(True)).all()
    return [
        MenuItemResponse(
            id=i.id, name=i.name, description=i.description, price=float(i.price),
            category_id=i.category_id, image_url=i.image_url, is_available=i.is_available,
            category_name=i.category.name if i.category else None
        ) for i in items
    ]


@router.post("/categories", response_model=CategoryResponse, status_code=201)
def create_category(payload: CategoryCreate, ctx=Depends(require_restaurant_member), db: Session = Depends(get_db)):
    _, membership = ctx
    item = Category(restaurant_id=membership.restaurant_id, **payload.model_dump())
    db.add(item); db.commit(); db.refresh(item)
    return item


@router.post("/menu-items", response_model=MenuItemResponse, status_code=201)
def create_menu_item(payload: MenuItemCreate, ctx=Depends(require_restaurant_member), db: Session = Depends(get_db)):
    _, membership = ctx
    if payload.category_id and not db.query(Category).filter(
        Category.id == payload.category_id, Category.restaurant_id == membership.restaurant_id
    ).first():
        raise HTTPException(400, "Invalid category")
    item = MenuItem(restaurant_id=membership.restaurant_id, **payload.model_dump())
    db.add(item); db.commit(); db.refresh(item)
    return MenuItemResponse(
        id=item.id, name=item.name, description=item.description, price=float(item.price),
        category_id=item.category_id, image_url=item.image_url, is_available=item.is_available,
        category_name=item.category.name if item.category else None
    )
