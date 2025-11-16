document.getElementById("signupBtn").addEventListener("click", async ()=>{
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if(!username || !email || !password){ toast("Fill all fields"); return;}

  const res = await fetch(`${API_BASE}/auth/signup`, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ username, email, password })
  });

  if(!res.ok){
    const e = await res.json().catch(()=>({detail:"Signup failed"}));
    toast(e.detail || "Signup failed");
    return;
  }

  toast("Account created — please login");
  window.location.href = "login.html";
});
