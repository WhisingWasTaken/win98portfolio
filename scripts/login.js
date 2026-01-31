  function login(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (password === "admin") {
      alert("Welcome, " + username + "!");
      window.location.href = "mainpage.html";
    } else {
      alert("How the fuck did you change that?");
    }
  }

  function cancelLogin() {
    window.close();
  }