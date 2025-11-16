async function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
    });

    const data = await res.json();

    if (res.status === 200) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "home.html";
    } else {
        alert("Invalid login");
    }
}
