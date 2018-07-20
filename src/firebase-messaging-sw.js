// Initialize Firebase App

// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '855520535176'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();


