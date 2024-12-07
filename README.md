# Project Setup 
## Backend
- Setup .env file
- Build and run docker containers
```
docker compose up -d --build
```
- Run migrations 
```
docker compose exec backend python manage.py migrate
```
- Open localhost:8000 in browser

## Frontend
- Set up frontend .env.local file
- Build and run frontend
```
cd frontend && npm run build && npm run dev
```
- Open localhost:3000 in browser

