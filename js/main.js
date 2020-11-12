if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(() => {
        console.error("Pendaftaran ServiceWorker gagal");
      });
  });   
} else {
    console.error("ServiceWorker belum didukung browser ini.");
}

// Periksa fitur Notification API
if ("Notification" in window) {
  requestPermission();
  } else {
  console.error("Browser tidak mendukung notifikasi.");
};

function requestPermission() {
  Notification.requestPermission().then(result => {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }
    console.log("Fitur notifikasi diijinkan.");
  });
};



if (('PushManager' in window)) {
  navigator.serviceWorker.getRegistration().then(registration => {
      registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
              "BFD3pdN6r1f7j8RPF70dFFbKp7SiXNYuU09W4IJqaRIzbJ4hpuw6tvmDC-JbSA3ntyZNVpW17hkYp5OpN3jklFk"
          )
      }).then(function (subscribe) {
          console.log('Berhasil melakukan subscribe dengan endpoint: ',
              subscribe.endpoint);
          console.log('Berhasil melakukan subscribe dengan p256dh key: ',
              btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
          console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(
              String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
      }).catch(function (e) {
          console.error('Tidak dapat melakukan subscribe ', e.message);
      });
  });
}
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}