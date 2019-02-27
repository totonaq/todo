import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from '../../store/store.js';
import Todo from '../todo';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <Todo/>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;