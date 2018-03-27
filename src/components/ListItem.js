import React from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Button } from 'react-native';
import {connect} from 'react-redux';
import {editItem} from '../actions/listItemActions';
import Icon from 'react-native-vector-icons/FontAwesome';

class ListItem extends React.Component {
  static navigationOptions = {
    title: 'List Item',
  };

  constructor(props){
    super();

    let listId = props.navigation.state.params.listId;
    let itemId = props.navigation.state.params.itemId;
    let item = props.lists[listId].items[itemId];

    this.state = {
      itemName: item.name,
      itemContent: item.content,
      editingItemName: false
    }
  }

  handleSubmitNameChange(){
    let newName = this.state.itemName;
    let listId = this.props.navigation.state.params.listId;
    let itemId = this.props.navigation.state.params.itemId;
    this.setState({
      editingItemName: false
    });

    this.props.editItem(listId, itemId, newName, null);
  }

  handleSubmitContentChange(){
    let newContent = this.state.itemContent;
    let listId = this.props.navigation.state.params.listId;
    let itemId = this.props.navigation.state.params.itemId;

    this.props.editItem(listId, itemId, null, newContent);
  }

  componentWillReceiveProps(nextProps){
    // let listId = nextProps.navigation.state.params.listId;
    // let itemId = nextProps.navigation.state.params.itemId;
    // let item = nextProps.lists[listId].items[itemId];

    // this.setState({
    //   itemName: item.name,
    //   itemContent: item.content
    // });
  }

  render() {
    let { params } = this.props.navigation.state;

    if (!params)
      return null;

    let item = this.props.lists[params.listId].items[params.itemId];

    return (
      <View style={{height: "100%"}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
          <Text style={{display: this.state.editingItemName ? 'none' : 'flex', fontSize: 30}}>{this.state.itemName}</Text>
          <TextInput 
            style={{display: this.state.editingItemName ? 'flex' : 'none'}}
            onChangeText={(text) => this.setState({itemName: text})}
            value={this.state.itemName}
            onSubmitEditing={this.handleSubmitNameChange.bind(this)}
            />
          <Icon name="edit" onPress={()=>this.setState({editingItemName: true})} style={{marginLeft: 15}} size={34} />
        </View>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white"}}>
          <TextInput
            onChangeText={(text) => this.setState({itemContent: text})}
            value={this.state.itemContent}
            onSubmitEditing={this.handleSubmitContentChange.bind(this)}
            />
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
    editItem : (listId, itemId, name, content) => {
      dispatch(editItem(listId, itemId, name, content));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);