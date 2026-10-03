from pydantic import BaseModel, EmailStr, Field

class RegisterRequest(BaseModel):
    restaurant_name: str = Field(min_length=2, max_length=150)
    owner_name: str = Field(min_length=2, max_length=120)
    owner_email: EmailStr
    password: str = Field(min_length=8, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    restaurant_id: str
    restaurant_slug: str
