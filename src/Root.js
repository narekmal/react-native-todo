import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import Login from './components/Login';

import {Provider} from 'react-redux';

import store from './store/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}