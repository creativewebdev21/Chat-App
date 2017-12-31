import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

import { Actions } from 'react-native-router-flux';

class Conversations extends React.Component {
  state = {
    conversations: [],
    placeholder: "New conversation with..."
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
