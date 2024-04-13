const btnLogout = document.querySelector(".logout__logOutButton");

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Do you want logout ?")) {
    alert("You're signed out");
    window.location.href = "login.html";
  }
});