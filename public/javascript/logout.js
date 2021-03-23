async function logout() {
  fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
}

document.querySelector("#logout").addEventListener("click", logout);
