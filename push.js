var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BFD3pdN6r1f7j8RPF70dFFbKp7SiXNYuU09W4IJqaRIzbJ4hpuw6tvmDC-JbSA3ntyZNVpW17hkYp5OpN3jklFk",
    "privateKey": "fCw261v8rVyDxGA5OIMtZPxy8kLEWfNyeN8VIFMVvjc"
};
 
 
webPush.setVapidDetails(
    'mailto:budi.handarbeni@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dWGkmqdz7gc:APA91bFbTlfZQv0oor0pxjzleLS--rjXGXuxKCycmBnJVaVlebnUDSftN30Rl27AZwabHb6E2hd2GKfAulia3cx8VVF-qscIgt0bE8wiYLSr_FMIxdY3SUKnzd2YT9WVT53B9kxix4yF",
    "keys": {
        "p256dh": "BIgAKwZuqRVSBsAV4NeVAUazGRpQQEhvj84MqSeSrXLJpNW5JxXbfwObgOOLYH3M/ZIQ6Mj04os/KhtT9rjwwio=",
        "auth": "OgYPjPrjP6FLgQCeu/RREg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '580211239650',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
