function league_lists(params) {
    let league = "";
    params.competitions.forEach(lists => {
        if (lists.id === 2001 || lists.id === 2002 || lists.id === 2019|| lists.id === 2021 || lists.id === 2014 || lists.id === 2015 ) {
            league += `
            <div class="col s12 m6 l4">
                <div class="card medium z-depth-5"  id="l${lists.id}">
                    <a href="leaguedetail.html?id=${lists.id}" class="waves-effect waves-teal">
                        <div class="card-image">
                            <img src="../img/${lists.name}.png" alt="${lists.name}">
                        </div>
                        <div class="card-content">
                            <hr>
                            <li>Start Date : ${lists.currentSeason.startDate}</li>
                            <li>End Date : ${lists.currentSeason.endDate}</li>
                            <li>Current Match Day : ${lists.currentSeason.currentMatchday}</li>
                        </div>
                    </a>
                </div>
            </div>
            `
        }
    });
    document.getElementById("league").innerHTML = league;
}