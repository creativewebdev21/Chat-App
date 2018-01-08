import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';

import {
  Actions
} from 'react-native-router-flux';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCvD9Mtqv0XV4g9Oep9gBR5kjcAYfRh1mw",
  authDomain: "del-messaging.firebaseapp.com",
  databaseURL: "https://del-messaging.firebaseio.com",
  projectId: "del-messaging",
  storageBucket: "",
  messagingSenderId: "942567491330"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class Home extends React.Component {
  state = {
    name:'',
    email:'',
    phone:'',
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var time = new Date();

        // POSTS welcome message to users/{UID}/conversations/welcome
        firebase.database().ref('users/' + uid + '/conversations/welcome/').set({
          username: uid,
          email: email,
          message: "welcome to del-squared chat app!",
          displayName: displayName,
          phone: "phone number",
          recipient: "del-squared",
          time: "textTime"
        });
        // Open Conversations Page
        Actions.conversations({
          uid: uid,
          email: email,
        });
      } else {
        // User is signed out.
        alert("User signed out...");
      }
    });
  }

  render() {
    return(
      <View>
        <Text style={styles.title}>
          Del-Squared Messaging
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Santa Claus"
          onChangeText={(text) => {
            this.setState({
              name: text
            });
          }}
          value={this.state.name}
        />
        <TextInput
          style={styles.input}
          placeholder="santa@claus.com"
          onChangeText={(text) => {
            this.setState({
              email: text
            });
          }}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="513 456 7890"
          onChangeText={(text) => {
            this.setState({
              phone: text
            });
          }}
          value={this.state.phone}
        />
        <TouchableOpacity
          onPress={() => {
            var email = this.state.email;
            let that = this;
            firebase.auth().signInWithEmailAndPassword(email, "password").catch(function(error) {// user doesn't exist
              firebase.auth().createUserWithEmailAndPassword(email, "password").catch(function(createError) {
                // Handle Errors here.
                var errorCode = createError.code;
                var errorMessage = createError.message;
                alert("login error" + errorCode );
              });
            });

            }}
        >
          <Text style={styles.registerText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: 'blue',
    margin: 20
  },
  registerText: {
    marginLeft: 20,
    fontSize: 20
  }
})

export default Home;
