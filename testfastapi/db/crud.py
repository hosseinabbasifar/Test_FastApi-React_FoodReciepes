from typing import List, Optional
from sqlalchemy.orm import Session

from testfastapi.db.models import Recipe as RecipeModel
from testfastapi.schemas import RecipeCreate



def get_recipe(db: Session, recipe_id: int) -> Optional[RecipeModel]:
    
    return db.query(RecipeModel).filter(RecipeModel.id == recipe_id).first()



def get_recipes(db: Session, skip: int = 0, limit: int = 100) -> List[RecipeModel]:
   
    return db.query(RecipeModel).offset(skip).limit(limit).all()



def create_recipe(db: Session, recipe: RecipeCreate) -> RecipeModel:
    
    db_recipe = RecipeModel(
        label=recipe.label,
        source=recipe.source,
        url=str(recipe.url) 
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe



def search_recipes(db: Session, keyword: str, skip: int = 0, limit: int = 100) -> List[RecipeModel]:
    return db.query(RecipeModel).filter(
        RecipeModel.label.contains(keyword)
    ).offset(skip).limit(limit).all()