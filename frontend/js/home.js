document.addEventListener("DOMContentLoaded", initHome);

async function initHome(){
  const search = document.getElementById("global-search");
  const results = document.getElementById("results");
  document.getElementById("add-recipe-btn").addEventListener("click", ()=> location.href="add_recipe.html");
  document.getElementById("my-recipes-btn").addEventListener("click", ()=> location.href="my_recipes.html");

  // load initial recipes
  await loadRecipes();

  search.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      await loadRecipes(search.value.trim());
    }
  });
}

async function loadRecipes(q=""){
  const arr = await searchRecipes(q);
  const results = document.getElementById("results");
  results.innerHTML = "";
  if (!arr || arr.length===0) {
    results.innerHTML = `<div class="card">No recipes found</div>`;
    return;
  }
  arr.forEach(r => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="recipe-title">${escapeHtml(r.title)}</div>
      <div class="recipe-meta">By: <strong>${escapeHtml(r.username||r.poster || "unknown")}</strong></div>
      <div class="recipe-body">${escapeHtml(r.ingredients)}\n\n${escapeHtml(r.instructions)}</div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn small" onclick="viewRecipe(${r.id})">View</button>
        <button class="btn small" onclick="saveThis(${r.id})">Save</button>
      </div>
    `;
    results.appendChild(el);
  });
}

function viewRecipe(id) {
  // open the recipes page with query param
  location.href = `recipes.html?id=${id}`;
}

async function saveThis(id){
  try{
    await saveRecipe(id);
    alert("Saved!");
  }catch(e){
    alert("Save failed: " + e.message);
  }
}

// helper
function escapeHtml(s){ if(!s) return ""; return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;"); }

async function renderNavProfile(){
  const p = document.getElementById("profile-pic");
  const me = await apiGet("/auth/me");
  if (!me) return;
  p.innerHTML = `<img src="${me.avatar_url||'assets/avatar-default.png'}" style="width:100%;height:100%"/>`;
}
