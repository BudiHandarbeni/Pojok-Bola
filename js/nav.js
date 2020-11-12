document.addEventListener("DOMContentLoaded", () => {
  const sidnav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidnav);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Menampilkan daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
          elm.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
          elm.addEventListener("click", event => {
            const sideNav = document.querySelector(".sidenav")
            M.Sidenav.getInstance(sideNav).close();
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          })
        })
      }
    }
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  };

  let page = window.location.hash.substr(1);
  if (page === "") page = "Home";
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector("#body-content");
        if (page === "Home") {
          getLeague();
        }else if (page === "Favorite") {
          setFavTeam()
        }
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        }else if (this.status === 404) {
          content.innerHTML = "<p>Halaman Tidak Di temukan </p>";
        }else {
          content.innerHTML = "<p>Yahh... Halaman Tidak Dapat diakses </p>";
        }
      }
    };
    xhttp.open("GET", `/pages/${page}.html`, true);
    xhttp.send();
  };
});