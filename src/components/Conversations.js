import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

import { Actions } from 'react-native-router-flux';

import * as firebase from 'firebase';

class Conversations extends React.Component {
  state = {
    conversations: [],
    placeholder: "New conversation with...",
    uid: this.props.uid,
  };

  componentWillMount() {
    var that = this;
    return firebase.database().ref('users/' + this.state.uid + '/conversations/').once('value').then(function(snapshot) {
      let messageList = [];
      let i = 0;
      snapshot.forEach((conversationID) => {
        messageList[i] = {
          _id: i,
          text: conversationID.key,
          user: {
            _id: 2
          }
        };
        i++;
      })
      that.setState({
        conversations: messageList,
      });
    });
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
            recipient: messages[0].text,
            uid: this.state.uid,
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
