// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");

// validation form login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("Please fill in all fields !!!");
  } else {
    if(localStorage.getItem(inputUsername.value) === null ){
      alert("Account not already !!!");
      return;
    }
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
 
    if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      alert("Successful login !!!");
      window.location.href = "index.html";
    } else {
      alert("You entered the wrong password !!!");
    }
  }
});
