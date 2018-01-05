import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

import * as firebase from 'firebase';

class Chat extends React.Component {

  state = {
    messages: [],
    placeholder: "Type a message to " + this.props.recipient + "...",
    recipient: this.props.recipient,
    uid: this.props.uid,
  };

  constructor(props) {
   super(props);
   this.onLongPress = this.onLongPress.bind(this);
   alert("sender: " + this.state.uid);
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
          // Get a reference to the database service
          var newConversation = firebase.database().ref('conversations/').push();
          var time = new Date();
          newConversation.set({
            sender: this.state.uid,
            recipient: this.state.recipient,
            messages: messages,
            time: time.getFullYear() + " " + time.getMonth() + " " + time.getDate() + " " + time.getHours() + " " + time.getMinutes() + " " + time.getSeconds() + " " + time.getMilliseconds(),
          });
        }}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Chat;
