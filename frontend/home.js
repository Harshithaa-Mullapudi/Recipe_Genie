// Redirect if not logged in
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// Extract username from token
function decodeToken(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch (e) {
        return null;
    }
}

const data = decodeToken(token);
const username = data?.sub || "User";

// Show welcome message
document.getElementById("welcomeText").innerText = `Welcome, ${username} 👋`;


// Navigation
function gotoAddRecipe() {
    window.location.href = "add_recipe.html";
}

function gotoViewRecipes() {
    window.location.href = "recipes.html";
}

function gotoAiChef() {
    window.location.href = "ai.html";
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
