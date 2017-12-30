import React from 'react';

import Home from './components/Home';
import Chat from './components/Chat';
import Conversations from './components/Conversations';

import {
  Router,
  Scene
} from 'react-native-router-flux';

class App extends React.Component {
  render() {
    return(
      <Router>
        <Scene key='root'>
          <Scene key="home" component={Home} title="Home"/>
          <Scene key="chat" component={Chat} title="Chat"/>
          <Scene key="conversations" component={Conversations} title="Conversations"/>
        </Scene>
      </Router>
    );
  }
}

export default App;
