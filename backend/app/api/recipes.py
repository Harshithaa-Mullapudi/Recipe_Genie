
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.schemas import RecipeCreate
from backend.app.db.models import Recipe
from backend.app.core.security import get_current_user

router = APIRouter()

@router.post("/add")
def add_recipe(recipe: RecipeCreate, 
               db: Session = Depends(get_db),
               user=Depends(get_current_user)):

    new_recipe = Recipe(
        title=recipe.title,
        ingredients=recipe.ingredients,
        instructions=recipe.instructions,
        user_id=user.id
    )

    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)

    return {"message": "Recipe added successfully!", "recipe_id": new_recipe.id}

@router.get("/list")
def list_recipes(db: Session = Depends(get_db), user=Depends(get_current_user)):

    recipes = db.query(Recipe).filter(Recipe.user_id == user.id).all()

    return recipes
