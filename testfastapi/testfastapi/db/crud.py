from typing import List, Optional
from sqlalchemy.orm import Session

from testfastapi.db.models import Recipe as RecipeModel
from testfastapi.schemas import RecipeCreate,RecipeUpdate



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
    
    
    
    
def update_recipe(db: Session, recipe_id: int, recipe_update: RecipeUpdate) -> Optional[RecipeModel]:
    """
    update existing recipe
    """
    db_recipe = db.query(RecipeModel).filter(RecipeModel.id == recipe_id).first()
    if not db_recipe:
        return None
    
  
    update_data = recipe_update.dict(exclude_unset=True)
    for key, value in update_data.items():

        if key == "url":
            value = str(value)
        setattr(db_recipe, key, value)
    
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


def delete_recipe(db: Session, recipe_id: int) -> Optional[RecipeModel]:
    """
    delete recipe
    """
    db_recipe = db.query(RecipeModel).filter(RecipeModel.id == recipe_id).first()
    if not db_recipe:
        return None
    
    db.delete(db_recipe)
    db.commit()
    return db_recipe 