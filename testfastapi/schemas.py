from pydantic import BaseModel, HttpUrl

from typing import Sequence

class Config:
        from_attributes = True
        
class Recipe(BaseModel):
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