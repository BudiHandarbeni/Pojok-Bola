function reload() {
    const splash = document.querySelector(".splash");
    let urlParams = new URLSearchParams(window.location.search);
    let back = urlParams.get("back");
    reload1 = `
        <img class="fade-in responsive-img" src="img/512.png" alt="Pojok Bola">
        <h3 class="fade-in">Welcome Sedulur</h3>`
    reload2 = `
    <div class="preloader-wrapper big active" style="margin: auto;">
        <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>`
    if (back) {
        splash.innerHTML = reload2; 
        setTimeout(() => {
            splash.style.display ="none";
            document.getElementById("body-content").style.display = "block";
        }, 2000);
    } else {
        splash.innerHTML = reload1
        setTimeout(() => {
            splash.classList.add("fade-zero");
        }, 2000);
    }
}