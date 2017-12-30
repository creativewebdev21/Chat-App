import firebase from 'firebase';

class auth {
  uid = '';

  constructor() {
   firebase.initializeApp({
    apiKey: "AIzaSyCvD9Mtqv0XV4g9Oep9gBR5kjcAYfRh1mw",
    authDomain: "del-messaging.firebaseapp.com",
    databaseURL: "https://del-messaging.firebaseio.com",
    projectId: "del-messaging",
    storageBucket: "",
    messagingSenderId: "942567491330"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth.signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });
  }

  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

}
