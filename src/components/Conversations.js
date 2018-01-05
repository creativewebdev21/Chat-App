import React from 'react';

import * as firebase from 'firebase';

import { GiftedChat } from 'react-native-gifted-chat';

import { Actions } from 'react-native-router-flux';

class Conversations extends React.Component {
  state = {
    conversations: [
      {
        _id: 1,
        text: "test",
        user: {
          _id: 2
        }
      },
    ],
    placeholder: "New conversation with...",
    uid: this.props.uid
  };

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
