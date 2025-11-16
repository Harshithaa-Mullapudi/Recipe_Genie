document.addEventListener("DOMContentLoaded", initForm);

async function initForm(){
  const params = new URLSearchParams(location.search);
  const editId = params.get("edit");
  if (editId) {
    // fetch recipe and prefill
    const list = await apiGet("/recipes/list");
    const r = list.find(x=>String(x.id)===String(editId));
    document.getElementById("title").value = r.title;
    document.getElementById("ingredients").value = r.ingredients;
    document.getElementById("instructions").value = r.instructions;
    document.getElementById("submit-btn").textContent = "Update";
    document.getElementById("submit-btn").onclick = async ()=>{
      await apiPut(`/recipes/update/${editId}`, {
        title: document.getElementById("title").value,
        ingredients: document.getElementById("ingredients").value,
        instructions: document.getElementById("instructions").value
      });
      alert("Updated"); location.href="my_recipes.html";
    };
  } else {
    document.getElementById("submit-btn").onclick = async ()=>{
      await apiPost("/recipes/add", {
        title: document.getElementById("title").value,
        ingredients: document.getElementById("ingredients").value,
        instructions: document.getElementById("instructions").value
      });
      alert("Added"); location.href="my_recipes.html";
    };
  }
}
