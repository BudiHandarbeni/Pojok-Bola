function setClub(result) {
    let data = result
    let team = ""
    team += `
        <div class="detail-team">
            <div class="row">
                <div class="image col s12 m5 center-align">
                    <img src="${data.crestUrl}" alt="${data.name}" width="250" class="responsive-img">
                </div>
                <div class="descriptions-team col s8 m5">
                    <ul>
                        <li><h5>${data.name}</h5></li>
                        <li><span>Short Name : </span>${data.shortName}</li>
                        <li><span>Venue : </span>${data.venue}</li>
                        <li><span>Club Colors </span>${data.clubColors}</li>
                        <li><span>Address : </span>${data.address}</li>
                        <li><span>Website : </span>${data.website}</li>
                        <li><span>Email : </span>${data.email}</li>
                    </ul>
                </div>
                <div id="button-team" class=" center-align col s2 m2"></div>
            </div>
            <div class="row">
                <div class="col s12">
                <ul class="tabs">
                    <li class="tab col m6 grey darken-1 waves-effect  waves-light">
                        <a href="#test1" style="color: beige;">
                            <i class="material-icons">person</i>
                            Daftar Pemain
                        </a>
                    </li>
                    <li class="tab col m6 grey darken-1 waves-effect  waves-light">
                        <a href="#test2" style="color: beige;">
                            Jadwal Main
                            <i class="material-icons">schedule</i>
                        </a>
                    </li>
                </ul>
                </div>
                <div id="test1" class="col s12">
                    <div id="list-staff-and-player" class="col s12">
                        <table class="centered responsive-table">
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Position</th>
                                    <th>Nationality</th>
                                    <th>Date Of Birth</th>
                                </tr>
                            </thead>
                            <tbody id="data-staff-and-player">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="test2" class="col s12">
                    <div id="Jadwal" class="col s12">
                        <table class="centered responsive-table">
                            <thead>
                                <tr>
                                    <th>Home Team</th>
                                    <th></th>
                                    <th>Away Team</th>
                                </tr>
                            </thead>
                            <tbody id="data-matches">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `

    document.getElementById("body-content").innerHTML = team;
    let elem = document.querySelectorAll(".tabs");
    let instance = M.Tabs.init(elem); 
    let squad = ""
    data.squad.forEach(data => {
        let date = data.dateOfBirth
        date = date.substring(0, 10)
        let position = ""
        if (data.position == null) {
            position = "Coach"
        } else {
            position = data.position
        }
        squad += `
            <tr>
                <td>${data.name}</td>
                <td>${position}</td>
                <td>${data.nationality}</td>
                <td>${date}</td>
            </tr>
        `
    })
    document.getElementById("data-staff-and-player").innerHTML = squad;

    let idTeam = data.id;
    getFavTeams().then(items => {
        cekFavTeams(items)
    })

    function cekFavTeams(items) {
        let subscribeTeam = `
        <div class"subscribe" id="subscribe" style="margin-top: 50px; margin-left: 30px;">
            <a class="btn-floating btn-large  brown darken-3">
                <i class="material-icons">
                    favorite
                </i>
            </a>
        </div>`
        let deleteClub = ""

        document.getElementById("button-team").innerHTML = ""

        if (items.length === 0) {
            document.getElementById("button-team").classList.remove("delete");
            document.getElementById("button-team").classList.add("subscribe");
            document.getElementById("button-team").innerHTML = subscribeTeam;

        } else {
            items.forEach(items => {
                if (idTeam === items.id) {
                    document.getElementById("button-team").classList.remove("subscribe");
                    document.getElementById("button-team").classList.add("delete");
                    deleteClub += `
                    <div class"delete" id="delete" style="margin-top: 50px; margin-left: 30px;" data-id="${items.id}" data-name="${items.name}">
                        <a class="btn-floating btn-large pulse red">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>`
                    document.getElementById("button-team").innerHTML = deleteClub
                } else {
                    document.getElementById("button-team").classList.remove("delete");
                    document.getElementById("button-team").classList.add("subscribe");
                    document.getElementById("button-team").innerHTML = subscribeTeam;
                }
            })
        }

        function hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }

        let elem = document.getElementById("button-team")
        if (hasClass(elem, "subscribe") === true) {
            document.getElementById("subscribe").addEventListener("click", () => {
                saveTeamForLater(data)
                elem.classList.remove("subscribe")
                elem.classList.add("delete")
                getFavTeams().then(items => {
                    cekFavTeams(items)
                })
            })
        } else {
            document.getElementById("delete").addEventListener("click", (event) => {
                let id = document.getElementById("delete").getAttribute("data-id");
                let name = document.getElementById("delete").getAttribute("data-name");
                id = parseInt(id);
                deleteFavTeams(id, name)
                elem.classList.remove("delete")
                elem.classList.add("subscribe")
                getFavTeams().then(items => {
                    cekFavTeams(items)
                })
            })
        }
}}
function getJadwal(params) {
    matchDay ="";
    params.matches.forEach(data => {
        let date = `${data.utcDate}`;
        let dateStr = new Date(date);
        let dateIDN = dateStr.toLocaleDateString("IDN");
        let a = dateStr.toLocaleTimeString("IDN");
        matchDay += `
        <tr>
            <td><a href="club.html?id=${data.homeTeam.id}"><img src="https://crests.football-data.org/${data.homeTeam.id}.svg" alt="${data.homeTeam.name}" height="40"><br>${data.homeTeam.name}</a></td>
            <td>VS <br> ${dateIDN}<br>${a}</td>
            <td><a href="club.html?id=${data.awayTeam.id}"><img src="https://crests.football-data.org/${data.awayTeam.id}.svg" alt="${data.awayTeam.name}" height="40"><br>${data.awayTeam.name}</a></td>
        </tr>
        `;
    });
    document.getElementById("data-matches").innerHTML = matchDay;
}

