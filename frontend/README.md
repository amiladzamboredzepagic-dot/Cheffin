# Cheffin

Cheffin is a mobile-first, AI-driven visual platform designed for effortless recipe discovery, meal planning, and culinary inspiration with a dedicated focus on healthy ingredients.

## Tech stack

- Frontend: React, TypeScript, and Vite
- Backend: FastAPI and Strawberry GraphQL
- Database: MongoDB

## Getting started

You will need Node.js with npm, Python 3.9 or later, and access to the
project's MongoDB Atlas cluster.

### Configure the backend

From the repository root, create `backend/.env` and set `MONGO_URI` to the
connection string for the project's MongoDB Atlas cluster:

```dotenv
MONGO_URI=<your MongoDB Atlas connection string>
```

The database name defaults to `cheffin`. Keep the connection string private;
do not commit `backend/.env`.

### Start the backend

In a PowerShell terminal from the repository root:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install "fastapi" "uvicorn[standard]" "strawberry-graphql[fastapi]" motor pydantic-settings python-dotenv
python -m uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Open `http://localhost:8000/graphql`
to use the GraphQL interface.

### Start the frontend

Open a second terminal from the repository root:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (`http://localhost:5173`). The
frontend currently connects to the backend at `http://localhost:8000/graphql`.

## Current API

The backend has a basic mock-up `recipes` query and `addRecipe` mutation. Recipes
currently have an ID, title, description, image URL, and calorie count. The
frontend is still a starter screen; connecting it to the recipe API is future
work.

## Frontend commands

Run these from `frontend/`:

```powershell
npm run dev      # Start the development server
npm run build    # Type-check and build for production
npm run lint     # Check code with Oxlint
npm run preview  # Preview the production build
```
