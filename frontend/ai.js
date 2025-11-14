document.getElementById("generateBtn").addEventListener("click", generateRecipe);

async function generateRecipe() {
    const ingredients = document.getElementById("ingredients").value;

    const response = await fetch("http://127.0.0.1:8000/ai/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: ingredients })
    });

    const data = await response.json();
    console.log("AI Response: ", data);

    document.getElementById("output").innerText = data.recipe;
}
