from fastapi import FastAPI, APIRouter, Query,HTTPException

from typing import Optional
from schemas import RecipeSearchResults, Recipe, RecipeCreate
from recipe_data import RECIPES
from testfastapi.api.endpoints import recipes as recipes_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Recipe API", openapi_url="/openapi.json")
app.include_router(recipes_router.router, prefix="/recipes", tags=["recipes"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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








if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")