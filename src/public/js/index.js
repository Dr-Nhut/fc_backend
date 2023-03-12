var username = localStorage.getItem("username");
//Gán tên lên localstogare
if (username) {
  var h1_name = document.querySelector("#username");
  var li_login = document.querySelector(".js_login_item");
  var li_username = document.querySelector(".js_username_item");
  h1_name.innerHTML = username;
  li_login.classList.add("hidden");
  li_username.classList.remove("hidden");
}

// Logout

var logout = document.querySelector("#logout");

logout.onclick = function () {
  localStorage.clear();
};
