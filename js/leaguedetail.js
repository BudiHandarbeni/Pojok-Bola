// create the change of color navigation 
function backgroundcolor(params) {
    if (params.competition.code === "CL" || params.competition.code === "PD") {
        const backColor = "rgb(9, 57, 121)";
        return backColor 
    }else if (params.competition.code === "PL") {
        const backColor = "rgb(61, 9, 104)";
        return backColor
    }else if (params.competition.code === "FL1") {
        const backColor = "rgb(207, 218, 54)";
        return backColor
    }else if (params.competition.code === "BL1") {
        const backColor = "red";
        return backColor
    }else {
        const backColor = "rgb(207, 218, 54)";
        return backColor
    };
};

function leaguedetail(params,color) {
    leagueDetail = "";
    leagueDetail += `
    <nav class="nav-extended" style="background-color: ${color};">
        <a href="index.html" class="brand-logo left" style="padding-left: 20px;">
            <i class="large material-icons">arrow_back</i>
        </a>
        <div class="nav-wrapper container">
            <a href="#" class="brand-logo">
                <img class="responsive-img" src="../img/${params.competition.name}.png" alt="${params.competition.name}" style="height: 75px; padding: 3px;object-fit: contain;">
            </a>
        </div>
        <div class="nav-content container ">
            <ul class="tabs tabs-transparent ">
                <li class="tab m4"><a href="#Jadwal">Jadwal</a></li>
                <li class="tab m4"><a href="#Klasemen">Klasemen</a></li>
                <li class="tab m4"><a href="#TS">Top Scores</a></li>
            </ul>
        </div>
    </nav>
    <div class="container">
                    <div id="Klasemen" class="col s12 m4">
                        <table class="centered responsive-table">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th></th>
                                    <th>Teams</th>
                                    <th>MD</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>G</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                    <th>POINT</th>
                                </tr>
                            </thead>
                            <tbody id="data-standings">
                            </tbody>
                        </table>
                    </div>
                    <div id="Jadwal" class="col s12 m4">
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
                    <div id="TS" class="col s12 m4">
                        <table class="centered responsive-table">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Team Name</th>
                                    <th>Goals</th>
                                </tr>
                            </thead>
                            <tbody id="data-scores">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("content").innerHTML = leagueDetail;
    let elem = document.querySelectorAll(".tabs");
    let instance = M.Tabs.init(elem); 
    let standings = "";
    params.standings[0].table.forEach(data => {
        standings += `
        <tr>
            <td>${data.position}</td>
            <td><img src="${data.team.crestUrl}" alt="${data.team.name}" class="responsive-img" width="40" height="40"></td>
            <td><a href="club.html?id=${data.team.id}">${data.team.name}</a></td>
            <td>${data.playedGames}</td>
            <td>${data.won}</td>
            <td>${data.draw}</td>
            <td>${data.lost}</td>
            <td>${data.goalsFor}</td>
            <td>${data.goalsAgainst}</td>
            <td>${data.goalDifference}</td>
            <td>${data.points}</td>
        </tr>
        `;
    })
    document.getElementById("data-standings").innerHTML = standings;

};


function setCompetitionMatch(result) {
    matchDay ="";
    result.matches.forEach(data => {
        let date = `${data.utcDate}`;
        let dateStr = new Date(date);
        let dateIDN = dateStr.toLocaleDateString("IDN");
        let a = dateStr.toLocaleTimeString("IDN");
        matchDay += `
        <tr>
            <td><a href="club.html?id=${data.homeTeam.id}"><img src="https://crests.football-data.org/${data.homeTeam.id}.svg" alt="${data.homeTeam.name}" width="40" height="40"><br>${data.homeTeam.name}</a></td>
            <td>VS <br> ${dateIDN}<br>${a}</td>
            <td><a href="club.html?id=${data.awayTeam.id}"><img src="https://crests.football-data.org/${data.awayTeam.id}.svg" alt="${data.awayTeam.name}" width="40" height="40"><br>${data.awayTeam.name}</a></td>
        </tr>
        `;
    });
    document.getElementById("data-matches").innerHTML = matchDay;
};


function setScoresCompetition(result) {
    let data = result.scorers;
    let player = "";
    data.forEach(data => {
        player += `
        <tr>
            <td>${data.player.name}</td>
            <td><a href="club.html?id=${data.team.id}"><img src="https://crests.football-data.org/${data.team.id}.svg" alt="${data.team.name}" width="40" height="40"><br>${data.team.name}</a></td>
            <td>${data.numberOfGoals}</td>
        </tr>
        `;
    });
    document.getElementById("data-scores").innerHTML = player;
};