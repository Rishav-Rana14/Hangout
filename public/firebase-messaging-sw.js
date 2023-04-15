// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyBLJ8d59yt911BUld1smVc7I5yqAud7fCY",
    authDomain: "samdemo-8bda2.firebaseapp.com",
    projectId: "samdemo-8bda2",
    storageBucket: "samdemo-8bda2.appspot.com",
    messagingSenderId: "737659344808",
    appId: "1:737659344808:web:eeb416ef86987ba59f2f9d",
    measurementId: "G-9ZMGJPEBN3"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging().si;

messaging?.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});