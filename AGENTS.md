# Coding Solver — AGENTS.md

## Repo structure

```
codingsolver/
├── backend/    Lumen 10 PHP API (micro-framework)
└── frontend/   React 19 + Vite 8 SPA (plain JSX, no TypeScript)
```

Two independent projects, no monorepo tooling. Work on each from its own directory.

## Commands

### Backend (backend/)
| Command | Action |
|---|---|
| `php artisan serve` | Dev server on `localhost:8000` |
| `php artisan make:controller NameController` | Create controller |
| `php artisan make:model Name` | Create model |
| `php artisan make:migration create_table_name` | Create migration |
| `vendor/bin/phpunit` | Run all tests |
| `vendor/bin/phpunit tests/ExampleTest.php` | Single test |

### Frontend (frontend/)
| Command | Action |
|---|---|
| `npm run dev` | Dev server with HMR (`localhost:5173`) |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | ESLint on all `.js/.jsx` |
| `npm run preview` | Preview production build |

## API proxy

Vite dev server proxies `/api/*` → `http://localhost:8000` (configured in `vite.config.js`). Always run `php artisan serve` alongside `npm run dev` for full-stack dev.

## Conventions

- **Frontend is JSX only** — no TypeScript. Use `.jsx` extension for components.
- **CSS** is global CSS files per component area: `index.css` (design tokens, reset), `App.css` (component styles). No CSS modules or CSS-in-JS.
- **Components** live in `frontend/src/components/`. Each is a default-exported function.
- **Backend** follows standard Lumen structure. Routes in `routes/web.php`, controllers in `app/Http/Controllers/`.
- **Lumen config**: Facades and Eloquent are commented out in `bootstrap/app.php` — uncomment `$app->withFacades()` and `$app->withEloquent()` to enable them.
- **No frontend router** yet — single-page landing with hash-less anchor sections (`#services`, `#portfolio`, etc.).

## Gotchas

- Backend `.env` has no `APP_KEY` set. Run `php artisan key:generate` before using encryption/session features.
- Backend DB config in `.env` points to `homestead` credentials — not configured.
- Frontend `allowedHosts` in `vite.config.js` must be updated if accessing via a different tunnel/domain.
- No Docker or environment containers — requires PHP 8.1+, Composer, Node 18+ directly on host.
