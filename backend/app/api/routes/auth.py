from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models import Restaurant, RestaurantMember, User, UserRole
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=AuthResponse, status_code=201)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.owner_email).first():
        raise HTTPException(409, "Email already registered")

    base_slug = "".join(c.lower() if c.isalnum() else "-" for c in payload.restaurant_name).strip("-")
    slug = base_slug or "restaurant"
    n = 2
    while db.query(Restaurant).filter(Restaurant.slug == slug).first():
        slug = f"{base_slug}-{n}"
        n += 1

    user = User(name=payload.owner_name, email=payload.owner_email, password_hash=hash_password(payload.password))
    restaurant = Restaurant(name=payload.restaurant_name, slug=slug, owner_email=payload.owner_email)
    db.add_all([user, restaurant])
    db.flush()

    membership = RestaurantMember(restaurant_id=restaurant.id, user_id=user.id, role=UserRole.OWNER)
    db.add(membership)
    db.commit()

    return AuthResponse(
        access_token=create_access_token(user.id, user.role.value, restaurant.id),
        user_id=user.id, restaurant_id=restaurant.id, restaurant_slug=restaurant.slug
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(401, "Invalid email or password")

    membership = db.query(RestaurantMember).filter(RestaurantMember.user_id == user.id).first()
    if not membership:
        raise HTTPException(403, "Restaurant membership not found")

    restaurant = db.get(Restaurant, membership.restaurant_id)
    return AuthResponse(
        access_token=create_access_token(user.id, membership.role.value, restaurant.id),
        user_id=user.id, restaurant_id=restaurant.id, restaurant_slug=restaurant.slug
    )
