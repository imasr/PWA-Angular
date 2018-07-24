importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase.js');

if (!firebase.apps.length) {
    firebase.initializeApp({
        messagingSenderId: "855520535176"
    });
}

const messaging = firebase.messaging();


