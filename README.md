# Recipe Finder (MERN Stack)

A full-stack recipe search app. React (Vite) frontend, Express + MongoDB backend.
Recipe data comes from [TheMealDB](https://www.themealdb.com/api.php) (free, no signup).
There's no login — each browser gets its own favorites list, stored in MongoDB and
tracked with a random ID kept in localStorage.

## What's inside

```
recipe-finder/
├── backend/     Express API — only handles saving/removing favorites
└── frontend/    React app — talks to TheMealDB directly for search, and to the
                 backend for favorites
```

## 1. Unzip

After downloading, unzip normally. **Windows sometimes creates a doubled folder**
(e.g. `recipe-finder/recipe-finder/...`) when extracting — if you open the folder
and immediately see another folder with the exact same name inside, go one level
deeper before opening it in your editor/terminal.

## 2. Backend setup

```powershell
cd backend
npm install
copy .env.example .env
```

Open `.env` and set `MONGO_URI`.

**If you're on JioFiber:** Atlas's default connection string uses `mongodb+srv://`,
which relies on an SRV DNS lookup that JioFiber blocks. In the Atlas dashboard, go
to **Connect → Drivers**, and look for the option for clusters/drivers **without DNS
SRV support** — it gives you a `mongodb://` string with the shard hosts spelled out
directly and `:27017` on each one. Use that version instead. Full example is
commented in `backend/.env.example`.

If PowerShell blocks the `npm` command with an execution policy error, run this once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then start the backend:

```powershell
npm run dev
```

You should see `MongoDB connected` and `Recipe Finder API running on http://localhost:5000`.

## 3. Frontend setup

Open a **second** terminal:

```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```

Open the app at **http://localhost:5173**.

## How it works

- **Search / browse**: the frontend calls TheMealDB directly (`search.php`,
  `filter.php`, `categories.php`, `lookup.php`) — no backend needed for this part.
- **Favorites**: clicking the heart on a recipe calls your Express API
  (`GET/POST/DELETE /api/favorites`), which reads/writes a `favorites` collection
  in MongoDB, scoped to a random per-browser ID.

## Troubleshooting

- **"MongoDB connection failed"** → double check `MONGO_URI` in `backend/.env`,
  and if on JioFiber, confirm you're using the non-SRV string (see above).
- **Favorites don't save / network errors in the browser console** → make sure
  the backend terminal is still running on port 5000, and that
  `frontend/.env` has `VITE_API_URL=http://localhost:5000/api`.
- **Blank recipe results** → TheMealDB occasionally rate-limits the shared free
  test key under heavy use; wait a few seconds and search again.
