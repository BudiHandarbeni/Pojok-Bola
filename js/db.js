let dbPromised = idb.open("PojokBola", 2, function (upgradeDb) {
    let favTeams =  upgradeDb.createObjectStore("favTeams", {
        keyPath : "id"
    });
    favTeams.createIndex("name", "name", {
        unique : false
    });
});

function saveTeamForLater(data) {
    dbPromised
     .then(db => {
         let tx = db.transaction("favTeams", "readwrite");
         let store = tx.objectStore("favTeams")
         store.put(data)
         return tx.complete;
     })
     .then(() => {
         title = "Team Sudah disimapan";
         let options = {
             body: `Club ${data.name} sudah tersimpan, cek Team Favorite.`,
             badge: "/img/logo32.png",
             icon: "/img/Logo (128).png",
             actions: [{
                 action: "yes-action",
                 title: "Ya"
             },
             {
                 action: "no-action",
                 title: "Tidak"
             }],
         };
         if (Notification.permission === "granted") {
             navigator.serviceWorker.ready.then(registration => {
             registration.showNotification(title, options);
            });
         }else {
             M.toast({
                 html: `Club ${data.name} berhasil disimpan, cek Team Favorite.`,
             });
            }
        })
}
function getFavTeams() {
    return new Promise(function (resolve, reject) {
        dbPromised
         .then(db => {
            let tx = db.transaction("favTeams", "readonly");
            let store = tx.objectStore("favTeams")
            return store.getAll();
        }).then(club => {
            resolve(club)
        })
    });
}

function favTeamsID(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
         .then(db => {
            let tx = db.transaction("favTeams", "readonly");
            let store = tx.objectStore("favTeams")
            return store.get(id);
        }).then(club => {
            resolve(club)
        })
    });
}


function deleteFavTeams(idTeam, nameTeam) {
    dbPromised.then(db => {
            let tx = db.transaction("favTeams", "readwrite");
            let store = tx.objectStore("favTeams");
            store.delete(idTeam);
            return tx.complete;
        })
        .then(() => {
            const title = 'Data Team Berhasil Di Hapus TOLL!';
            let options = {
                body: `${nameTeam} berhasil dihapus dari list Favorite.`,
                badge: "/img/logo32.png",
                icon: "/img/Logo (128).png"
            };
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification(title, options);
                });
            } else {
                M.toast({
                    html: `${nameTeam} berhasil dihapus dari list Favorite`,
                });
            }
        })
}