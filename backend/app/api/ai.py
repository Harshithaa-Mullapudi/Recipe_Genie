from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from openai import OpenAI
import os

router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
                {"role": "user", "content": prompt},
            ],
        )

        return {"recipe": response.choices[0].message["content"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
