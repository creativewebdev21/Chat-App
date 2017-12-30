import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

import { Actions } from 'react-native-router-flux';

class Conversations extends React.Component {
  state = {
    conversations: []
  };

  render() {
    return(
      <GiftedChat
        messages={this.state.conversations}
        onSend={(messages) => {
          //send message
          Actions.chat({
            //pass props to chat.js
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
