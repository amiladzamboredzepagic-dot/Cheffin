from fastapi import FastAPI, Request
from strawberry.fastapi import GraphQLRouter
from app.schema import schema
from app.graphql_context import GraphQLContext

app = FastAPI()

async def get_context(request: Request = None):
    return GraphQLContext(request=request)

graphql_app = GraphQLRouter(schema, context_getter=get_context)
app.include_router(graphql_app, prefix="/graphql")