import React from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Button } from 'react-native';
import {connect} from 'react-redux';
import {renameList} from '../actions/listActions';
import {toggleListItemCompleted, addItem, deleteItem} from '../actions/listItemActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

class List extends React.Component {

  static navigationOptions = {
    title: 'List',
  };

  constructor(props){
    super();

    let listId = props.navigation.state.params.listId;
    let listName = props.lists[listId].name;

    this.state={
      listName: listName,
      editingListName: false,

      addingItem: false, 
      newItemName: ''
    }
  }

  handleSubmitNameChange(){
    let newListName = this.state.listName;
    let listId = this.props.navigation.state.params.listId;
    this.setState({
      editingListName: false
    });

    this.props.renameList(listId, newListName);
  }

  componentWillReceiveProps(nextProps){
    let listId = nextProps.navigation.state.params.listId;
    let listName = nextProps.lists[listId].name;
    this.setState({
      listName: listName
    });
  }

  handleSubmitNewItem(){
    let { params } = this.props.navigation.state;
    if (this.state.newItemName)
      this.props.addItem(params.listId, this.state.newItemName);
    this.setState({addingItem: false, newItemName: ''});
  }

  render() {
    let { params } = this.props.navigation.state;
    let { navigate } = this.props.navigation;

    if (!params)
      return null;

    let list = this.props.lists[params.listId];

    let listItems = Object.keys(list.items).map(
      itemId => 
      <View key={itemId} style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox 
          onChange={()=>console.log('onChange')}
          onValueChange={(v)=>{this.props.toggleListItemCompleted(params.listId, itemId)}}
          value={list.items[itemId].completed}
          style={{marginRight: 10}} />
        <Text 
          onPress={() => navigate('ListItem', {listId: params.listId, itemId})}
          style={{textDecorationLine: list.items[itemId].completed ? 'line-through' : 'none', color: 'green', fontSize: 24}}>
          {list.items[itemId].name}
        </Text>
        <Icon name="close" onPress={()=>{this.props.deleteItem(params.listId, itemId)}} style={{marginLeft: 15}} size={30} color="red" />
      </View>
    );

    return (
      <View style={{flexDirection: "column", height: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
          <Text style={{display: this.state.editingListName ? 'none' : 'flex', fontSize: 30}}>{list.name}</Text>
          <TextInput 
            style={{display: this.state.editingListName ? 'flex' : 'none'}}
            onChangeText={(text) => this.setState({listName: text})}
            value={this.state.listName}
            onSubmitEditing={this.handleSubmitNameChange.bind(this)}
            />
          <Icon name="edit" onPress={()=>this.setState({editingListName: true})} style={{marginLeft: 15}} size={34} />
        </View>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'white'}}>
          {listItems}
          <TextInput
            style={{display: this.state.addingItem ? 'flex' : 'none', width: 150}} 
            placeholder="Add Item"
            onSubmitEditing={this.handleSubmitNewItem.bind(this)}
            onChangeText={(text) => this.setState({newItemName: text})}
            value={this.state.newItemName}
            />
        </View>
        <View style={{marginTop: 5, marginBottom: 5, alignItems: 'center'}}>
          <Ionicon.Button name='md-add' onPress={()=>this.setState({addingItem: true})}>ADD ITEM</Ionicon.Button>
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
    renameList : (listId, listName) => {
      dispatch(renameList(listId, listName));
    },
    toggleListItemCompleted : (listId, itemId) => {
      dispatch(toggleListItemCompleted(listId, itemId));
    },
    addItem : (listId, itemName) => {
      dispatch(addItem(listId, itemName));
    },
    deleteItem : (listId, itemId) => {
      dispatch(deleteItem(listId, itemId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);