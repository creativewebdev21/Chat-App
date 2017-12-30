import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends React.Component {
  state = {
    messages: []
  };

  render() {
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => {
          //send message
        }}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Chat;
