from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class RecipeCreate(BaseModel):
    title: str
    ingredients: str
    instructions: str



class RecipeOut(BaseModel):
    id: int
    title: str
    ingredients: str
    instructions: str

    class Config:
        orm_mode = True
