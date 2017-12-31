import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends React.Component {
  state = {
    messages: [],
    placeholder: "Type a message to " + this.props.recipient + "..."
  };

  constructor(props) {
   super(props);
   this.onLongPress = this.onLongPress.bind(this);
 }

  componentWillMount() {
    demoMessages = ["Thought you should know…", "I could use your service", "Hello"]
    messages = [];
    for (var i = 0; i < 3; i++) {
      messages.push({
        _id: i,
        text: demoMessages[i],
        user: {
          _id: 2,
          name: "Test User"
        }
      });
    }
    this.setState({
      messages: messages
    })
  }

  onLongPress() {
    const options = [
      'Copy Text',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Clipboard.setString(this.props.currentMessage.text);
          break;
      }
    });
  }

  render() {
    return(
      <GiftedChat
        messages={this.state.messages}
        placeholder={this.state.placeholder}
        onLongPress={this.onLongPress}
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
