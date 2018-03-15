import React from 'react';
import {StackNavigator} from 'react-navigation';
import {KeyboardAvoidingView} from 'react-native';
import List from './List';
import Home from './Home';

var Navigator = StackNavigator({
    Home: { screen: Home },
    List: { screen: List },
});

export default class App extends React.Component {
  render() {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <Navigator />
        </KeyboardAvoidingView>
    );
  }
}