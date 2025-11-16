<<<<<<< HEAD
from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import os

# Force-load .env file manually
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

=======
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from openai import OpenAI
import os

>>>>>>> auth-feature
router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

<<<<<<< HEAD
class Ingredients(BaseModel):
    items: str

@router.post("/generate")
def generate_recipe(info: Ingredients):

    prompt = f"Create a detailed cooking recipe using these ingredients: {info.items}. Include dish name, ingredients, steps."

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return {"recipe": response.choices[0].message["content"]}
=======
class IngredientsInput(BaseModel):
    ingredients: str

@router.post("/generate")
async def generate_recipe(data: IngredientsInput):
    try:
        prompt = f"Create a detailed cooking recipe with only these ingredients: {data.ingredients}."

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful recipe generator."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8
        )

        recipe = response.choices[0].message.content
        return {"recipe": recipe}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
>>>>>>> auth-feature
