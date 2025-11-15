async function loadAll() {

    let res = await fetch("http://127.0.0.1:8000/recipes/all");
    let data = await res.json();

    const container = document.getElementById("recipesContainer");
    container.innerHTML = "";

    data.forEach(r => {
        container.innerHTML += `
        <div class="recipe-card">
            <h3>${r.title}</h3>
            <p><strong>Ingredients:</strong> ${r.ingredients}</p>
            <p><strong>Instructions:</strong> ${r.instructions}</p>
        </div>`;
    });
}

loadAll();
