import React, {Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {login, createUser} from '../actions/loginActions';
import {StackNavigator} from 'react-navigation';
import Lists from './Lists';
import List from './List';
import ListItem from './ListItem';
import Ionicon from 'react-native-vector-icons/Ionicons';

var Navigator = StackNavigator({
  Lists: { screen: Lists },
  List: { screen: List },
  ListItem: { screen: ListItem }
});

class Login extends Component {

  constructor(props){
    super();

    this.state = {
      userName: '',
      password: '',
      creatingUser: false
    };
  }

  processInput(){
    if(!this.state.userName || !this.state.password)
      return;

    if(this.props.authToken)
      return;
    
    if(this.state.creatingUser)
      this.props.createUser(this.state.userName, this.state.password);
    else
      this.props.login(this.state.userName, this.state.password);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.authActionActive && !nextProps.authActionActive && !nextProps.authToken)
      alert(this.state.creatingUser ? 'Failed to Create User' : 'Failed Login');
  }

  render() {
    return (
      <View style={{height: "100%"}}>

        <View style={{display: !this.props.authToken && !this.props.authActionActive ? "flex" : "none", alignItems: "center", justifyContent: "center", height: "100%"}}>
          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <TextInput onChangeText={(text)=>this.setState({userName: text})} placeholder="User Name" onSubmitEditing={this.processInput.bind(this)} style={{width: 150}}/>
            <TextInput onChangeText={(text)=>this.setState({password: text})} placeholder="Password" onSubmitEditing={this.processInput.bind(this)} style={{width: 150, marginBottom: 20}} secureTextEntry={true}/>
            <Ionicon.Button name={this.state.creatingUser ? 'md-add' : 'md-log-in'} onPress={this.processInput.bind(this)}>
              {this.state.creatingUser ? 'CREATE USER' : 'LOG IN'}
            </Ionicon.Button>
          </View>
          <Ionicon.Button 
            name={this.state.creatingUser ? 'ios-arrow-back' : 'ios-arrow-forward'} 
            onPress={()=>{this.setState((s, p) => ({...s, creatingUser: !s.creatingUser}))}}
            >
            {this.state.creatingUser ? 'LOG IN' : 'CREATE USER'}
          </Ionicon.Button>
          <View style={{height: 10}}/>
        </View>

        <View style={{display: this.props.authActionActive ? "flex" : "none", alignItems: "center", justifyContent: "center", height: "100%"}}>
          <Text>Processing...</Text>
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
    },
    createUser : (userName, password) => {
      dispatch(createUser(userName, password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
