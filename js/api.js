function statusReq(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
};

function json(response) {
    return response.json();
};

function error(error) {
    console.log(error);
};

const apiFootbal = (url) => {
    return fetch(url, {
        headers: {
            'X-Auth-Token' : "508ee883b12a4a2292431c7f1c272a58"
        }
    });
};

function getLeague() {
    let url = "https://api.football-data.org/v2/competitions?plan=TIER_ONE";
    if ('caches' in window) {
        caches.match(url)
         .then(function (response) {
             if (response) {
                 response.json()
                  .then(list => {
                      league_lists(list)
                  })
             }
         })
    };
    apiFootbal(url)
     .then(json)
     .then( responseJson => {
        league_lists(responseJson)
     }) 
     .catch(error)
};

function getStandings() {
    let urlParams = new URLSearchParams(window.location.search);
    let idPrams = urlParams.get("id");
    let url = `https://api.football-data.org/v2/competitions/${idPrams}/standings`;
    if ('caches' in window) {
        caches.match(url)
         .then(response => {
             if (response) {
                 response.json()
                  .then(list => {
                    let color = backgroundcolor(list)
                    leaguedetail(list, color)
                  })
             }
         })
    }
    apiFootbal(url)
     .then(statusReq)
     .then(json)
     .then(responseJson => {
         let color = backgroundcolor(responseJson)
         leaguedetail(responseJson, color)
     })
     .catch(error)
};
function getSchedules() {
    let urlParams = new URLSearchParams(window.location.search);
    let idPrams = urlParams.get("id");
    let url = `https://api.football-data.org/v2/competitions/${idPrams}/matches?status=SCHEDULED`;
    if ('caches' in window) {
        caches.match(url)
            .then(response => {
                if (response) {
                    response.json()
                    .then(list => {
                        setCompetitionMatch(list)
                    })
                }
            })
    }
    apiFootbal(url)
     .then(statusReq)
     .then(json)
     .then(responseJson => {
         setCompetitionMatch(responseJson)
     })
        .catch(error)
}
function getScores() {
    let urlParams = new URLSearchParams(window.location.search);
    let idPrams = urlParams.get("id");
    let url = `https://api.football-data.org/v2/competitions/${idPrams}/scorers`;
    if ('caches' in window) {
        caches.match(url)
         .then(response => {
             if (response) {
                 response.json()
                  .then(list => {
                      setScoresCompetition(list)
                  })
             }
         })
    }
    apiFootbal(url)
     .then(statusReq)
     .then(json)
     .then(responseJson => {
         setScoresCompetition(responseJson)
     })
     .catch(error)
}


function setClubID() {
    return new Promise(function(resolve,reject) {
       let urlParams = new URLSearchParams(window.location.search);
       let idPrams = urlParams.get("id");
       let url = `https://api.football-data.org/v2/teams/${idPrams}`;
       if ('caches' in window) {
            caches.match(url)
            .then(response => {
                if (response) {
                    response.json()
                    .then((list => {
                        setClub(list)
                        resolve(list)
                    }))
                }
            })
        };
        apiFootbal(url)
        .then(statusReq)
        .then(json)
        .then(responsJson => {
            setClub(responsJson)
            resolve(responsJson)
        })
        .catch(error)  
    });
}
function getSchedulesID() {
    let urlParams = new URLSearchParams(window.location.search);
    let idPrams = urlParams.get("id");
    let url = `https://api.football-data.org/v2/teams/${idPrams}/matches/`;
    if ('caches' in window) {
        caches.match(url)
         .then(response => {
             if (response) {
                 response.json()
                  .then(list => {
                      setClub(list)
                  })
             }
         })
    };
    apiFootbal(url)
     .then(statusReq)
     .then(json)
     .then(responsJson => {
         getJadwal(responsJson)
     })
     .catch(error)
}

