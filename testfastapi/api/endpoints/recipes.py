# testfastapi/api/endpoints/recipes.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from testfastapi.db.session import get_db
from testfastapi.db import crud
from testfastapi.schemas import Recipe, RecipeCreate

router = APIRouter()

@router.post("/", response_model=Recipe, status_code=201)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    """
   create new recipe
    """
    return crud.create_recipe(db=db, recipe=recipe)



@router.get("/", response_model=List[Recipe])
def read_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    get all recipes list
    """
    recipes = crud.get_recipes(db, skip=skip, limit=limit)
    return recipes

@router.get("/{recipe_id}", response_model=Recipe)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    """
    get recipe by ID
    """
    db_recipe = crud.get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail=f"Recipe with ID {recipe_id} not found")
    return db_recipe


@router.get("/search/", response_model=List[Recipe])
def search_for_recipes(
    keyword: str = Query(..., min_length=1, description="Keyword to search for in recipe labels"),
    db: Session = Depends(get_db)
):
    """
    search recipe with keyword
    """
    results = crud.search_recipes(db=db, keyword=keyword)
    return results