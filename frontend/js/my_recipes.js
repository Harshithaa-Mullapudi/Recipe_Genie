document.addEventListener("DOMContentLoaded", loadMyRecipes);
async function loadMyRecipes(){
  const all = await apiGet("/recipes/list");
  const username = await getCurrentUsername(); // implement if backend has /auth/me; else parse token payload
  const mine = all.filter(r => r.username === username || r.user_id === username);
  const container = document.getElementById("my-list");
  container.innerHTML = "";
  mine.forEach(r=>{
    const el = document.createElement("div"); el.className="card";
    el.innerHTML = `<div class="recipe-title">${r.title}</div>
      <div class="recipe-body">${r.instructions}</div>
      <div style="margin-top:8px">
         <button class="btn small" onclick="editRecipe(${r.id})">Edit</button>
         <button class="btn small secondary" onclick="deleteRecipe(${r.id})">Delete</button>
      </div>`;
    container.appendChild(el);
  });
}

function editRecipe(id){ location.href = `add_recipe.html?edit=${id}`; }

async function deleteRecipe(id){
  if(!confirm("Delete this recipe?")) return;
  await apiDelete(`/recipes/delete/${id}`);
  alert("Deleted");
  loadMyRecipes();
}
