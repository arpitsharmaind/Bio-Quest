# BioQuest

Biological-products marketing site, converted from a static HTML/CSS page into a
**decoupled Laravel API + React SPA**.

```
bio-quest/
├── backend/     Laravel 13 JSON API (SQLite, Sanctum auth)
├── frontend/    React 19 + Vite SPA (Bootstrap 5, React Router)
├── index.html   ← original static site (kept for reference)
├── css/  images/ ← original assets (kept for reference)
```

## Prerequisites
- PHP 8.4+ and Composer
- Node 20+ and npm

## Backend (Laravel API) — http://127.0.0.1:8000

```bash
cd backend
composer install                 # first time only
php artisan migrate:fresh --seed # create + seed the SQLite database
php artisan serve                # starts the API on :8000
```

Uses SQLite (`backend/database/database.sqlite`) — no DB server needed.

**Seeded admin login:** `admin@bioquest.test` / `password`

### API endpoints
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET  | `/api/products` | public | Active products |
| GET  | `/api/categories` | public | Active categories (home grid) |
| GET  | `/api/categories/{slug}` | public | One category + its products |
| GET  | `/api/slides` | public | Active hero-carousel slides |
| GET  | `/api/settings` | public | Site settings (contact info) as key→value |
| POST | `/api/contact` | public | Submit contact form |
| POST | `/api/login` | public | Get a Sanctum bearer token |
| GET  | `/api/me` | token | Current admin user |
| POST | `/api/logout` | token | Revoke token |
| GET/POST | `/api/admin/categories` | token | List all / create |
| PUT/DELETE | `/api/admin/categories/{id}` | token | Update / delete |
| GET/POST | `/api/admin/products` | token | List all / create (with `category_id`) |
| PUT/DELETE | `/api/admin/products/{id}` | token | Update / delete |
| GET/POST | `/api/admin/slides` | token | List all / create (multipart image upload) |
| POST/DELETE | `/api/admin/slides/{id}` | token | Update (multipart) / delete |
| PUT | `/api/admin/settings` | token | Bulk-update settings `{settings:{key:value}}` |
| GET | `/api/admin/contacts` | token | List submissions |
| PATCH | `/api/admin/contacts/{id}/read` | token | Mark read |
| DELETE | `/api/admin/contacts/{id}` | token | Delete submission |

## Frontend (React SPA) — http://localhost:5173

```bash
cd frontend
npm install     # first time only
npm run dev     # starts Vite on :5173
```

The API base URL is set in `frontend/.env` (`VITE_API_URL`).

### Routes
- `/` — public storefront (navbar, hero carousel, about, products from API, contact form, footer)
- `/admin/login` — admin sign-in
- `/category/:slug` — category page (banner, content, product list)
- `/admin` — dashboard (protected)
- `/admin/slides` — hero slides CRUD with image upload (protected)
- `/admin/categories` — categories CRUD with page content (protected)
- `/admin/products` — products CRUD, each assigned to a category (protected)
- `/admin/contact-info` — edit the Contact Us section content (protected)
- `/admin/contacts` — contact submissions (protected)

Admin auth uses a Sanctum bearer token stored in `localStorage`.

## Notes
- Run **both** servers together during development (API on :8000, SPA on :5173).
- CORS allows the Vite dev origin — see `backend/config/cors.php`.
- Uploaded slide images are stored in `backend/public/uploads/slides/` and served
  directly by Laravel (no `storage:link` symlink needed). `APP_URL` in `backend/.env`
  must match the API host so image URLs resolve — it's set to `http://127.0.0.1:8000`.
  `migrate:fresh` re-seeds the 4 default hero slides.
- On Windows, the two native bindings in `frontend/package.json` `optionalDependencies`
  are pinned to work around a known npm optional-deps bug (npm/cli#4828). Adjust for
  other platforms if needed.
