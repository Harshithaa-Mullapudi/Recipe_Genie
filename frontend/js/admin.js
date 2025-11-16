document.addEventListener("DOMContentLoaded", loadUsers);

async function loadUsers(){
  const users = await adminListUsers(); // expects backend /admin/users
  const container = document.getElementById("users");
  container.innerHTML = "";
  users.forEach(u=>{
    const el = document.createElement("div"); el.className="card";
    el.innerHTML = `<div><strong>${u.username}</strong> — ${u.email} — admin: ${u.is_admin}</div>
      <div style="margin-top:8px">
        <button class="btn small" onclick="makeAdmin(${u.id})">Toggle Admin</button>
        <button class="btn small secondary" onclick="removeUser(${u.id})">Delete</button>
      </div>`;
    container.appendChild(el);
  });
}

async function removeUser(id){
  if(!confirm("Delete user?")) return;
  await adminDeleteUser(id);
  loadUsers();
}
async function makeAdmin(id){
  await adminUpdateUser(id, { is_admin: true }); // toggle depends on backend
  loadUsers();
}
