from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import os

# Force-load .env file manually
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
