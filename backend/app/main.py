from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from app.api.auth_routes import router as auth_router
from app.db.database import database
from app.graphql.context import GraphQLContext
from app.graphql.schema import schema


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await database["users"].create_index("email", unique=True)
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_context(request: Request = None):
    return GraphQLContext(request=request)

graphql_app = GraphQLRouter(schema, context_getter=get_context)
app.include_router(graphql_app, prefix="/graphql")
app.include_router(auth_router)