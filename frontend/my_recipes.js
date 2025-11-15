function getToken() {
    return localStorage.getItem("token");
}

async function loadMyRecipes() {
    let res = await fetch("http://127.0.0.1:8000/recipes/my", {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    let data = await res.json();
    const container = document.getElementById("recipesContainer");
    container.innerHTML = "";

    data.forEach(r => {
        container.innerHTML += `
        <div class="recipe-card">
            <h3>${r.title}</h3>
            <p><strong>Ingredients:</strong> ${r.ingredients}</p>
            <p><strong>Instructions:</strong> ${r.instructions}</p>

            <button onclick="editRecipe(${r.id})" class="edit-btn">Edit</button>
            <button onclick="deleteRecipe(${r.id})" class="delete-btn">Delete</button>
        </div>`;
    });
}

async function deleteRecipe(id) {
    if (!confirm("Are you sure?")) return;

    await fetch(`http://127.0.0.1:8000/recipes/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    loadMyRecipes();
}

function editRecipe(id) {
    window.location.href = `edit_recipe.html?id=${id}`;
}

loadMyRecipes();
