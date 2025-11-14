// Redirect if user is not logged in
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

document.getElementById("recipeForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();

    const message = document.getElementById("msg");

    const response = await fetch("http://127.0.0.1:8000/recipes/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            title,
            ingredients,
            instructions
        })
    });

    const data = await response.json();

    if (response.ok) {
        message.style.color = "green";
        message.innerText = "Recipe added successfully!";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    } else {
        message.style.color = "red";
        message.innerText = data.detail || "Failed to add recipe";
    }
});
