document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const message = document.getElementById("msg");

    if (response.ok) {
        localStorage.setItem("token", data.access_token);
        message.style.color = "green";
        message.innerText = "Login successful!";

        // redirect to homepage
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);

    } else {
        message.style.color = "red";
        message.innerText = data.detail || "Login failed!";
    }
});
