# Cheffin

Cheffin is a mobile-first, AI-driven visual platform designed for effortless recipe discovery, meal planning, and culinary inspiration with a dedicated focus on healthy ingredients.

## Tech stack

- Frontend: React, TypeScript, and Vite
- Backend: FastAPI and Strawberry GraphQL
- Database: MongoDB

## Backend layout

Backend code is grouped by responsibility under `backend/app`:

```text
app/
  api/       HTTP routes
  core/      configuration and security
  db/        database client and access
  graphql/   GraphQL schema and request context
  recipes/   Recipe validation and GraphQL mutations
  main.py    FastAPI application setup
```

Admin account tooling lives in `backend/scripts`. The application entrypoint
remains `app.main:app`.

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

## Recipe creation API

Authenticated users can create private drafts or publish recipes through the
`createRecipe` GraphQL mutation. It stores the title, optional description, non-empty
ingredients, optional preparation steps, positive integer preparation time and
servings, meal type, and an optional JPG/PNG image up to 10 MB in MongoDB.
Recipes are associated with the authenticated user and are private by default.
The owner can publish a draft through `publishRecipe`; `publicRecipes` returns
only published recipes, including to unauthenticated visitors. Existing recipes
without a visibility flag remain private.
Users can create collections, list their own collections, and assign a recipe
only to one of their own collections. Collection names are unique per user,
case-insensitively.

The manual recipe form offers Save and Publish actions. My recipes includes
status filters and an action to publish drafts. Discovery shows published
recipes alongside samples; published recipes do not yet have dietary, cuisine,
difficulty, or rating data, and bookmarks there are temporary. Mutations
require a bearer access token, as provided by the existing sign-in flow.

## Frontend commands

Run these from `frontend/`:

```powershell
npm run dev      # Start the development server
npm run build    # Type-check and build for production
npm run lint     # Check code with Oxlint
npm run preview  # Preview the production build
```
