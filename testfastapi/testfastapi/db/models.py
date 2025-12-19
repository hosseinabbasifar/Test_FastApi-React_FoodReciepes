from sqlalchemy import Column, Integer, String
from testfastapi.db.base import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, index=True)
    source = Column(String)
    url = Column(String, unique=True)