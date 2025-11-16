const API_BASE = "http://127.0.0.1:8000";

function getToken() {
  return localStorage.getItem("token") || "";
}

function authHeaders(json=true) {
  const h = {};
  if (json) h["Content-Type"] = "application/json";
  const t = getToken();
  if (t) h["Authorization"] = "Bearer " + t;
  return h;
}

async function handleResponse(res) {
  if (res.status === 401 || res.status === 403) {
    // not authenticated or token expired
    localStorage.removeItem("token");
    alert("Session ended — please login again.");
    window.location.href = "login.html";
    return null;
  }
  if (res.status >= 200 && res.status < 300) {
    // try json, otherwise text
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return await res.json();
    return await res.text();
  }
  const txt = await res.text();
  throw new Error(`${res.status} ${txt}`);
}

// Basic REST wrappers
export async function apiGet(path) {
  const res = await fetch(API_BASE + path, { headers: authHeaders() });
  return handleResponse(res);
}

export async function apiPost(path, body) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: authHeaders(true),
    body: JSON.stringify(body)
  });
  return handleResponse(res);
}

export async function apiPut(path, body) {
  const res = await fetch(API_BASE + path, {
    method: "PUT",
    headers: authHeaders(true),
    body: JSON.stringify(body)
  });
  return handleResponse(res);
}

export async function apiDelete(path) {
  const res = await fetch(API_BASE + path, {
    method: "DELETE",
    headers: authHeaders()
  });
  return handleResponse(res);
}

// Extra helpers
export async function searchRecipes(q) {
  // backend should support ?q= keyword search on recipes/list?q=...
  const url = API_BASE + "/recipes/list" + (q ? `?q=${encodeURIComponent(q)}` : "");
  const res = await fetch(url, { headers: authHeaders() });
  return handleResponse(res);
}

export async function saveRecipe(recipeId) {
  // expect backend POST /recipes/save { recipe_id: id } or similar
  return apiPost("/recipes/save", { recipe_id: recipeId });
}

export async function getSavedRecipes() {
  return apiGet("/recipes/saved");
}

// Admin helpers
export async function adminListUsers() {
  return apiGet("/admin/users");
}
export async function adminDeleteUser(userId) {
  return apiDelete(`/admin/users/${userId}`);
}
export async function adminUpdateUser(userId, payload) {
  return apiPut(`/admin/users/${userId}`, payload);
}
