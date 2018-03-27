import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../actions/loginActions';
import {getLists, addList, deleteList} from '../actions/listActions';
import Icon from 'react-native-vector-icons/FontAwesome';

class Lists extends React.Component {

    static navigationOptions = {
      title: 'Lists',
    };

    constructor(props) {
      super();

      this.state = {
          nameFilter: null,
          addingList: false,
          newListName: ''
      };

      // Test login has been used
      if(props.userName){
        props.getLists();
      }
    }

    componentWillReceiveProps(nextProps){
      // Just logged in
      if(!this.props.userName && nextProps.userName){
        this.props.getLists();
        this.setState({nameFilter: ''})
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

    render() { 
      const { navigate } = this.props.navigation;

      let lists = Object.keys(this.props.lists)
        .filter(listId => ( !this.state.nameFilter || this.props.lists[listId].name.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) != -1 ) )
        .map(listId => {
          return (
            <View key={listId} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text 
                onPress={() => navigate('List', {listId})} 
                style={{fontSize: 30}}>
                {this.props.lists[listId].name}
              </Text>
              <Icon name="close" onPress={()=>{this.props.deleteList(listId)}} style={{marginLeft: 15}} size={34} color="red" />
            </View>
          );
        });

      return (
        <View  style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Logged in as: </Text>
            <Text style={{fontWeight: 'bold', marginRight: 20}}>{this.props.userName}</Text>
            <Button onPress={()=>{this.props.logout()}} title="Log out" />
          </View>
          <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
            {lists}
            <TextInput 
              style={{display: this.state.addingList ? 'flex' : 'none', width: 150}} 
              placeholder="Add List"
              ref="addListInput"
              onSubmitEditing={this.handleAddListInputChanged.bind(this)}
              onChangeText={(text) => this.setState({newListName: text})}
              value={this.state.newListName}
              />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexBasis: '50%', alignItems: 'center', justifyContent: 'center'}}>
              <Button title="Add List" onPress={this.handleAddListClick.bind(this)}></Button>
            </View>
            <TextInput placeholder="Filter By Name" style={{flexBasis: '50%'}} onChangeText={(text)=>this.setState({nameFilter: text})}></TextInput>
          </View>
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
      getLists : () => {
        dispatch(getLists());
      },
      logout : () => {
        dispatch(logout());
      },
      addList : (name) => {
        dispatch(addList(name));
      },
      deleteList : (id) => {
        dispatch(deleteList(id));
      }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);