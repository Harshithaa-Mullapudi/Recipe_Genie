document.addEventListener("DOMContentLoaded", loadPage);

async function loadPage(){
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (id) {
    const all = await apiGet("/recipes/list"); // or /recipes/{id} if backend supports
    const r = all.find(x => String(x.id) === String(id));
    if (!r) { document.getElementById("recipe-detail").innerHTML = "<div class='card'>Recipe not found</div>"; return; }
    renderRecipe(r);
  } else {
    // fallback: show all
    const all = await apiGet("/recipes/list");
    document.getElementById("recipe-detail").innerHTML = "<div class='grid'></div>";
    const g = document.querySelector(".grid");
    all.forEach(r=>{
      const c = document.createElement("div"); c.className="card";
      c.innerHTML = `<div class="recipe-title">${escape(r.title)}</div>
        <div class="recipe-meta">By: ${escape(r.username||r.poster||"unknown")}</div>
        <div class="recipe-body">${escape(r.ingredients)}\n\n${escape(r.instructions)}</div>
        <div style="margin-top:12px"><button class="btn small" onclick="saveRecipeHandler(${r.id})">Save</button></div>`;
      g.appendChild(c);
    });
  }
}

function renderRecipe(r){
  document.getElementById("recipe-detail").innerHTML = `
    <div class="card">
      <div class="recipe-title">${escape(r.title)}</div>
      <div class="recipe-meta">By: ${escape(r.username||r.poster||"unknown")}</div>
      <div class="recipe-body">${escape(r.ingredients)}\n\n${escape(r.instructions)}</div>
    </div>
  `;
}

async function saveRecipeHandler(id){
  try{
    await saveRecipe(id);
    alert("Saved");
  }catch(e){ alert("Error: "+e.message); }
}

function escape(s){if(!s) return ""; return s.replaceAll("<","&lt;").replaceAll(">","&gt;");}
