// Elements
const authContainer = document.getElementById("authContainer");
const authTitle = document.getElementById("authTitle");
const authUsername = document.getElementById("authUsername");
const authPassword = document.getElementById("authPassword");
const authAction = document.getElementById("authAction");
const toggleAuth = document.getElementById("toggleAuth");
const navbar = document.getElementById("navbar");
const appContainer = document.getElementById("appContainer");

let currentUser = localStorage.getItem("currentUser");
let users = JSON.parse(localStorage.getItem("users")) || {};

if (currentUser) loginSuccess();

toggleAuth.onclick = () => {
  const isLogin = authTitle.innerText === "Login";
  authTitle.innerText = isLogin ? "Sign Up" : "Login";
  authAction.innerText = isLogin ? "Sign Up" : "Login";
  toggleAuth.innerHTML = isLogin
    ? 'Already have an account? <span>Login</span>'
    : 'Don\'t have an account? <span>Sign up</span>';
};

authAction.onclick = () => {
  const uname = authUsername.value.trim();
  const pass = authPassword.value.trim();

  if (!uname || !pass) return alert("Fill all fields!");

  const isLogin = authTitle.innerText === "Login";

  if (isLogin) {
    if (!users[uname] || users[uname].password !== pass) {
      alert("Invalid credentials");
    } else {
      localStorage.setItem("currentUser", uname);
      loginSuccess();
    }
  } else {
    if (users[uname]) {
      alert("User already exists!");
    } else {
      users[uname] = { password: pass, posts: [], name: uname };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! Please login.");
      toggleAuth.click();
    }
  }
};

function loginSuccess() {
  currentUser = localStorage.getItem("currentUser");
  users = JSON.parse(localStorage.getItem("users")) || {};
  document.body.classList.remove("dark");
  authContainer.classList.add("hidden");
  navbar.classList.remove("hidden");
  appContainer.classList.remove("hidden");
  renderPosts();
}

// Rest of the app continues...

// TODO: Continue from here with blogForm, renderPosts, edit/delete post,
// save display name, toggle dark mode, etc.

