function buySubscription() {
  const admin = {
    email: "admin@company.com",
    role: "ADMIN"
  };

  localStorage.setItem("user", JSON.stringify(admin));
  window.location.href = "app.html";
}

function login() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Enter email");
    return;
  }

  const user = {
    email,
    role: "USER"
  };

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "app.html";
}
