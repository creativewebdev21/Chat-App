import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

import * as firebase from 'firebase';

class Chat extends React.Component {

  state = {
    messages: [],
    placeholder: "Type a message to " + this.props.recipient + "...",
    recipient: this.props.recipient,
    uid: this.props.uid,
    newConversation: this.props.newConversation,
  };

  constructor(props) {
   super(props);
   this.onSend = this.onSend.bind(this);
   alert("sender: " + this.state.uid);
 }

  componentWillMount() {
    demoMessages = ["Thought you should know…", "I could use your service", "Hello"]
    messages = [];
    for (var i = 0; i < 3; i++) {
      messages.push({
        _id: i,
        text: i + ": " + demoMessages[i],
        user: {
          _id: 2,
          name: "DelBot"
        }
      });
    }
    this.setState({
      messages: messages,
      numOptions: demoMessages.length,
      options: demoMessages,
    })
  }

  onSend(messages) {
    newMessage = messages[0].text;
    if (newMessage < this.state.numOptions && newMessage >= 0) {
      messages[0].text = this.state.options[messages[0].text];
      // Get a reference to the database service
      if (this.state.newConversation) {
        var newConversation = firebase.database().ref('conversations/').push();
        var time = new Date();
        newConversation.set({
          sender: this.state.uid,
          recipient: this.state.recipient,
          messages: messages,
          time: time.getFullYear() + " " + time.getMonth() + " " + time.getDate() + " " + time.getHours() + " " + time.getMinutes() + " " + time.getSeconds() + " " + time.getMilliseconds(),
        });
        var userConversationRef = firebase.database().ref('/users/' + this.state.uid + '/conversations/' + newConversation.key);
        userConversationRef.set({
          participant: this.state.recipient,
        })
        alert(messages[0].text + " sent to " + this.state.recipient + "! New conversation created with conversationID: " + newConversation.key);
      } else {
        alert("conversation already exists, update conversations/{CID}/");
      }

    } else {
      alert("invalid message option for current FREE plan, please upgrade to send custom messages. Send a number between 0 - " + (this.state.options.length - 1) + " to send one of the MessageOptions from above.");
    }
  }

  render() {
    return(
      <GiftedChat
        messages={this.state.messages}
        placeholder={this.state.placeholder}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Chat;
