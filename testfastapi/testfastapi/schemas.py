from pydantic import BaseModel, HttpUrl

from typing import Sequence,Optional


        
class Recipe(BaseModel):
    class Config:
        from_attributes = True
        
    id: int
    label: str
    source: str
    url: HttpUrl


class RecipeSearchResults(BaseModel):
    results: Sequence[Recipe]


class RecipeCreate(BaseModel):
    label: str
    source: str
    url: HttpUrl
    
class RecipeUpdate(BaseModel):
    label: Optional[str] = None
    source: Optional[str] = None
    url: Optional[HttpUrl] = None