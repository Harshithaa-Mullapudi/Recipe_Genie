document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    const message = document.getElementById("msg");

    if (response.ok) {
        message.style.color = "green";
        message.innerText = "Signup successful! Redirecting to login...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

    } else {
        message.style.color = "red";
        message.innerText = data.detail || "Signup failed!";
    }
});


