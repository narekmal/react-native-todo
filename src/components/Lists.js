import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../actions/loginActions';
import {getLists, addList, deleteList} from '../actions/listActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Share, {ShareSheet, Button as ShareButton} from 'react-native-share';

class Lists extends React.Component {

  static navigationOptions = {
    title: 'Lists',
  };

  constructor(props) {
    super();

    this.state = {
      nameFilter: null,
      addingList: false,
      newListName: '',
      sharing: false,
      shareMessage: ''
    };

    this.shareOptions = {
      title: 'React Native ToDo',
      url: ''
    }

    // Test login has been used
    if (props.userName) {
      props.getLists();
    }
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.userName && nextProps.userName){
      // Just logged in or created user
      this.setState({nameFilter: ''})
      if(nextProps.justCreatedUser)
        alert('User Created');
      else
        this.props.getLists();
    }
  }

  handleAddListClick(){
    this.setState({addingList: true});
  }

  handleAddListInputChanged(){
    if (this.state.newListName)
      this.props.addList(this.state.newListName);
    this.setState({addingList: false, newListName: ''});
  }

  share(listId){
    let items = Object.values(this.props.lists[listId].items).reduce((a, v) => (a+v.name+', '), '');
    items = items.substring(0, items.length - 2);
    let message = `List: ${this.props.lists[listId].name} \r\nItems: ${items}`;
    this.setState({sharing: true, shareMessage: message});
  }

  cancelShare(){
    this.setState({sharing: false});
  }

  render() { 
    const { navigate } = this.props.navigation;

    let lists = Object.keys(this.props.lists)
      .filter(listId => ( !this.state.nameFilter || this.props.lists[listId].name.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) != -1 ) )
      .map(listId => {
        return (
          <View key={listId} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <Text 
              onPress={() => navigate('List', {listId})}
              style={{fontSize: 30}}>
              {this.props.lists[listId].name}
            </Text>
            <Icon name='share-alt' onPress={()=>{this.share(listId)}} style={{marginLeft: 15}} size={33} color='green' />
            <Icon name='close' onPress={()=>{this.props.deleteList(listId)}} style={{marginLeft: 15}} size={34} color='red' />
          </View>
        );
      });

    return (
      <View  style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text>Logged in as: </Text>
          <Text style={{fontWeight: 'bold', marginRight: 20}}>{this.props.userName}</Text>
          <Ionicon.Button name='md-log-out' onPress={()=>{this.props.logout()}}>LOG OUT</Ionicon.Button>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
          {lists}
          <TextInput 
            style={{display: this.state.addingList ? 'flex' : 'none', width: 150}} 
            placeholder='Add List'
            ref='addListInput'
            onSubmitEditing={this.handleAddListInputChanged.bind(this)}
            onChangeText={(text) => this.setState({newListName: text})}
            value={this.state.newListName}
            />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexBasis: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Ionicon.Button name='md-add' onPress={this.handleAddListClick.bind(this)}>ADD LIST</Ionicon.Button>
          </View>
          <TextInput placeholder='Filter By Name' style={{flexBasis: '50%'}} onChangeText={(text)=>this.setState({nameFilter: text})}></TextInput>
        </View>
        <ShareSheet visible={this.state.sharing} style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Icon.Button name='close' onPress={this.cancelShare.bind(this)}>Close</Icon.Button>
            <View style={{height: 22}}/>
            <Icon.Button name='facebook' backgroundColor='#3b5998' 
              onPress={()=>{
                this.cancelShare();
                Share.shareSingle({social: 'facebook', message: this.state.shareMessage, ...this.shareOptions});
              }}>
              Facebook
            </Icon.Button>
            <View style={{height: 10}}/>
            <Icon.Button name='twitter' backgroundColor='#51ABF0'
              onPress={()=>{
                this.cancelShare();
                Share.shareSingle({social: 'twitter', message: this.state.shareMessage, ...this.shareOptions});
              }}>
              Twitter
            </Icon.Button>
            <View style={{height: 10}}/>
            <Icon.Button name='google-plus' backgroundColor='#DB4A3C'
              onPress={()=>{
                this.cancelShare();
                Share.shareSingle({social: 'googleplus', message: this.state.shareMessage, ...this.shareOptions});
              }}>
              Google Plus
            </Icon.Button>
          </View>
        </ShareSheet>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    ...state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getLists: () => {
      dispatch(getLists());
    },
    logout: () => {
      dispatch(logout());
    },
    addList: (name) => {
      dispatch(addList(name));
    },
    deleteList: (id) => {
      dispatch(deleteList(id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);