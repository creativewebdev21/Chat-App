import React from 'react';

import * as firebase from 'firebase';

import { GiftedChat } from 'react-native-gifted-chat';

import { Actions } from 'react-native-router-flux';

class Conversations extends React.Component {
  state = {
    conversations: [],
    placeholder: "New conversation with...",
    uid: this.props.uid
  };

  componentWillMount() {
    this.getFirebaseConversations();
  }

  getFirebaseConversations() {
    var conversations = [];
    var conversationsRef = firebase.database().ref('users/' + this.state.uid + '/conversations');
    conversationsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          // key is name of each conversation
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          this.setState(prevState => {
            conversations = prevState.conversations;
            conversations.push({
              _id: conversations.length + 1,
              text: key,
              user: {
                _id: 2
              }
            });
            return {
              conversations: conversations,
              placeholder: prevState.placeholder,
              uid: prevState.uid,
            }
          });
      }.bind(this));
    }.bind(this));
  }

  render() {
    return(
      <GiftedChat
        messages={this.state.conversations}
        placeholder={this.state.placeholder}
        isAnimated={true}
        onSend={(messages) => {
          //create new conversation
          Actions.chat({
            //pass props to chat.js
            recipient: messages[0].text
          });
        }}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Conversations;
