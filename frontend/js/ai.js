if(!getToken()) window.location.href = "login.html";

const genBtn = document.getElementById("generateBtn");
const saveAiBtn = document.getElementById("saveAiBtn");

genBtn.addEventListener("click", async ()=>{
  const text = document.getElementById("aiIngredients").value.trim();
  if(!text) return toast("Enter ingredients");

  const res = await fetch(`${API_BASE}/ai/generate`, {
    method:"POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ ingredients: text })
  });

  if(!res.ok){
    const errText = await res.text().catch(()=>"Server error");
    toast("AI failed: " + errText);
    return;
  }

  const data = await res.json();
  document.getElementById("aiResultCard").style.display = "block";
  document.getElementById("aiResult").innerText = data.recipe || data;
});

saveAiBtn.addEventListener("click", async ()=>{
  const recipeText = document.getElementById("aiResult").innerText;
  // Simple parse: first line title or fallback
  const title = recipeText.split("\n")[0].slice(0,50) || "AI Recipe";
  const res = await fetch(`${API_BASE}/recipes/add`, {
    method:"POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      title,
      ingredients: "", 
      instructions: recipeText
    })
  });
  if(!res.ok) return toast("Save failed");
  toast("Saved to My Recipes");
});

async function generateRecipe() {
    const ingredients = document.getElementById("ingredients").value;

    const response = await apiPost("/ai/generate", { ingredients });

    document.getElementById("result").textContent = response.recipe;
}
