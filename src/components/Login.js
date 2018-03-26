import React, {Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../actions/loginActions';
import {StackNavigator} from 'react-navigation';
import Lists from './Lists';
import List from './List';

var Navigator = StackNavigator({
  Lists: { screen: Lists },
  List: { screen: List },
});

class Login extends Component {

  constructor(props){
    super();

    this.state = {
        userName: '',
        password: ''
    };
  }

  handleEnterClick(){
    this.props.login(this.state.userName, this.state.password);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.authenticating && !nextProps.authenticating && !nextProps.authToken)
      alert('Failed Login');
  }

  render() {
    return (
      <View style={{height: "100%"}}>

        <View style={{display: !this.props.authToken && !this.props.authenticating ? "flex" : "none", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%"}}>
          <Text style={{fontSize: 30}}>Log In</Text>
          <View style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <TextInput onChangeText={(text)=>this.setState({userName: text})} placeholder="User Name" style={{width: 150}}/>
            <TextInput onChangeText={(text)=>this.setState({password: text})} placeholder="Password" style={{width: 150, marginBottom: 20}}/>
            <Button onPress={this.handleEnterClick.bind(this)} title="Enter" />
          </View>
        </View>

        <View style={{display: this.props.authenticating ? "flex" : "none", alignItems: "center", justifyContent: "center", height: "100%"}}>
          <Text>Authenticating...</Text>
        </View>

        <Navigator style={{display: this.props.authToken ? "flex" : "none", height: "100%"}}></Navigator>
          
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
      ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
      login : (userName, password) => {
          dispatch(login(userName, password))
      }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
