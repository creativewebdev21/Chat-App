import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

import { Actions } from 'react-native-router-flux';

import * as firebase from 'firebase';

class Conversations extends React.Component {
  state = {
    conversations: [],
    placeholder: "New conversation with...",
    uid: this.props.uid,
    email: this.props.email,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var that = this;
    firebase.database().ref('users/' + this.state.uid + '/conversations/').on('value', function(snapshot) {
      let messageList = [];
      let i = 0;
      snapshot.forEach((conversationID) => {
        messageList.push({
          _id: i,
          text: conversationID.child("participant").val(),
          user: {
            _id: 2
          }
        });
        i++;
      })
      that.checkEmailMessages(that.state.email);
      that.setState({
        conversations: messageList,
      });
    });
  }

  /**
    Checks for email messages associated with account
  */
  checkEmailMessages(email) {
    let that = this;
    return firebase.database().ref('users/emails/conversations/').once('value', function(snapshot) {
      let emailMessageList = [];
      snapshot.forEach((conversationID) => {
        if (conversationID.child("email").val().toLowerCase() == email.toLowerCase()) {
          let userConversationRef = firebase.database().ref('users/' + that.state.uid + '/conversations/' + conversationID.key + '/')
          userConversationRef.set({
            participant:  conversationID.child("participant").val()
          });
        }
      })
      return emailMessageList;
    });
  }

  render() {
    return(
      <GiftedChat
        messages={this.state.conversations}
        placeholder={this.state.placeholder}
        isAnimated={true}
        onSend={(messages) => {
          userText = messages[0].text.toLowerCase();
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(userText)) {//Verify valid email
            //create new conversation
            Actions.chat({
              //pass props to chat.js
              recipient: messages[0].text,
              uid: this.state.uid,
              newConversation: true,
            });
          } else {
            alert ("Please enter a valid email address. " + userText + " is not an email address");
          }
        }}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Conversations;
