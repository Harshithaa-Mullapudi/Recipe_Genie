const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

async function loadRecipes() {

    const response = await fetch("http://127.0.0.1:8000/recipes/list", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await response.json();

    const container = document.getElementById("recipesList");

    if (data.length === 0) {
        container.innerHTML = "<p>No recipes found. Add one!</p>";
        return;
    }

    container.innerHTML = "";

    data.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;

        container.appendChild(card);
    });
}

loadRecipes();

function goHome() {
    window.location.href = "index.html";
}
