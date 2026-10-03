# BiteFlow Backend

FastAPI + PostgreSQL backend for the BiteFlow restaurant SaaS frontend.

## Stack
- FastAPI
- PostgreSQL
- SQLAlchemy 2
- JWT authentication
- Argon2 password hashing

## Run

Create a PostgreSQL database named `biteflow`, then:

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Main API contract

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

Register body:
```json
{
  "restaurant_name": "Kacchi Bhai",
  "owner_name": "Abir",
  "owner_email": "owner@example.com",
  "password": "password123"
}
```

### Public menu
- GET `/api/restaurants/{slug}/menu`

### Public ordering
- POST `/api/restaurants/{slug}/orders`

Body:
```json
{
  "table_number": "Table 05",
  "customer_name": "Anik Rahman",
  "items": [
    {"menu_item_id": "MENU_ITEM_ID", "quantity": 2}
  ]
}
```

### Protected restaurant operations
Send `Authorization: Bearer <token>`.

- POST `/api/categories`
- POST `/api/menu-items`
- GET `/api/orders`
- PATCH `/api/orders/{order_id}/status?status=PREPARING`
- GET `/api/dashboard/overview`
