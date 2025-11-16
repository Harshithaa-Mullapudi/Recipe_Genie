
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
<<<<<<< HEAD
=======

@router.put("/update/{recipe_id}")
def update_recipe(
    recipe_id: int,
    updated_data: RecipeCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    # Only owner can edit
    if recipe.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    # Update fields
    recipe.title = updated_data.title
    recipe.ingredients = updated_data.ingredients
    recipe.instructions = updated_data.instructions

    db.commit()
    db.refresh(recipe)

    return {"message": "Recipe updated successfully", "recipe": recipe}

@router.delete("/delete/{recipe_id}")
def delete_recipe(
    recipe_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    if recipe.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    db.delete(recipe)
    db.commit()

    return {"message": "Recipe deleted successfully"}
>>>>>>> auth-feature
