## Backend (Laravel API) — http://127.0.0.1:8000

```bash
cd backend
composer install                 # first time only
php artisan migrate:fresh --seed # create + seed the SQLite database
php artisan serve                # starts the API on :8000
```

## Frontend (React SPA) — http://localhost:5173

```bash
cd frontend
npm install     # first time only
npm run dev     # starts Vite on :5173
```
