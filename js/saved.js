function setFavTeam() {
    getFavTeams().then((data) => {
        favTeam(data);
    });

    function favTeam(result) {
        let listTeams = "";
        if (result.length === 0) {
            listTeams += `
            <div id="notHaveFavorite" class="center-align">
            <i class="large material-icons cancelLogoFavorite">cancel</i>
            </div>
            <h4 class= "center-align"style=" width:100%;">
                Upsssss... Belum Ada Fovorite Club
            </h4>
            `;
            document.getElementById("buka").innerHTML = listTeams;
        } else {
            result.forEach(data => {
                listTeams +=`
                <li class="collection-item avatar">
                    <a href="./club.html?id=${data.id}&saved=true">
                        <img src="${data.crestUrl}" alt="${data.name}" class="circle">
                        <span class="title" style= "color:black">${data.name}</span>
                        <a href="#!" id="delete" data-id="${data.id}" data-name="${data.name}" class="secondary-content"><i class="material-icons small" style="color:red">delete</i></a>
                    </a>
                </li>
                `
            });
            document.getElementById("buka").innerHTML = listTeams;
            document.getElementById("delete").addEventListener("click", (event) => {
                let id = document.getElementById("delete").getAttribute("data-id");
                let name = document.getElementById("delete").getAttribute("data-name");
                id = parseInt(id);
                deleteFavTeams(id, name)
                getFavTeams().then(items => {
                    favTeam(items);
                })
            })
        };
    };
};