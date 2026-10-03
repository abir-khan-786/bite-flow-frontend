from pydantic import BaseModel, Field


class CategoryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    sort_order: int = 0


class CategoryResponse(CategoryCreate):
    id: str

    model_config = {"from_attributes": True}


class MenuItemCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    description: str | None = None
    price: float = Field(gt=0)
    category_id: str | None = None
    image_url: str | None = None
    is_available: bool = True


class MenuItemResponse(MenuItemCreate):
    id: str
    category_name: str | None = None

    model_config = {"from_attributes": True}
