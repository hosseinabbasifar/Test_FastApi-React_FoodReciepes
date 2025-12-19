from fastapi import FastAPI, APIRouter, Query,HTTPException

from typing import Optional
from schemas import RecipeSearchResults, Recipe, RecipeCreate
from recipe_data import RECIPES
from testfastapi.api.endpoints import recipes as recipes_router

app = FastAPI(title="Recipe API", openapi_url="/openapi.json")
app.include_router(recipes_router.router, prefix="/recipes", tags=["recipes"])

api_router = APIRouter()


@app.get("/", status_code=200)
def root() -> dict:
    """
    Root GET
    """
    return {
        "message": "Welcome to the Recipe API!",
        "docs": "/docs",
        "redoc": "/redoc"
    }





app.include_router(api_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")