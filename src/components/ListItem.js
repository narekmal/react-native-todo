import React from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Image } from 'react-native';
import {connect} from 'react-redux';
import {editItem} from '../actions/listItemActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Maticon from 'react-native-vector-icons/MaterialCommunityIcons';
var ImagePicker = require('react-native-image-picker');

class ListItem extends React.Component {
  static navigationOptions = {
    title: 'List Item',
  };

  constructor(props){
    super(props);

    // - delete
    this.props.navigation.state.params = {
      listId: 'testlistid',
      itemId: 'testitemid'
    }

    let listId = this.props.navigation.state.params.listId;
    let itemId = this.props.navigation.state.params.itemId;
    let item = this.props.lists[listId].items[itemId];

    this.state = {
      itemName: item.name,
      itemContent: item.content,
      editingItemName: false,
      images: [
        'content://media/external/images/media/69',
        'content://media/external/images/media/50',
        'content://media/external/images/media/54',
      ],
      contacts: []
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

  attachImage(){
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel || response.error) {
        console.log('Image picker response = ', response);
      }
      else {
        //let source = { uri: response.uri };
        console.log(response.uri);

        this.setState(state => ({...state, images:[...state.images, response.uri]}) );
      }
    });
  }

  render() {
    let { params } = this.props.navigation.state;

    if (!params)
      return null;

    let item = this.props.lists[params.listId].items[params.itemId];

    let images = this.state.images.map(
      (image, index) => (
        <View key={index} style={{position: 'relative'}}>
          <Image source={{uri: image}} 
            style={{width: 80, height: 80, marginLeft: (index==0) ? 0 : 23, marginBottom: 23}} />
          <Ionicon 
            style={{position: 'absolute', right: -15, top: -15, backgroundColor: 'white', borderRadius: 17, width: 30, height: 31}} 
            name='md-close-circle' color='red'
            // onPress={()=>this.setState(state => ({...state, images: state.images.splice(index, 1)}) )} 
            onPress={()=>this.setState(state => {state.images.splice(index, 1); return state;} )} 
            size={34} />
        </View>
      )
    );

    return (
      <View style={{height: "100%",  backgroundColor: "white"}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{display: this.state.editingItemName ? 'none' : 'flex', fontSize: 30}}>{this.state.itemName}</Text>
          <TextInput 
            style={{display: this.state.editingItemName ? 'flex' : 'none'}}
            onChangeText={(text) => this.setState({itemName: text})}
            value={this.state.itemName}
            onSubmitEditing={this.handleSubmitNameChange.bind(this)}
            />
          <Icon name="edit" onPress={()=>this.setState({editingItemName: true})} style={{marginLeft: 15}} size={34} />
        </View>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <TextInput
            onChangeText={(text) => this.setState({itemContent: text})}
            value={this.state.itemContent}
            onSubmitEditing={this.handleSubmitContentChange.bind(this)}
            />
        </View>
        <View style={{alignItems:'center', marginBottom: 10}}> 
          <Ionicon.Button name='md-add' onPress={this.attachImage.bind(this)}>ATTACH IMAGE</Ionicon.Button>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            {images}
          </View>
        </View>
        <View style={{alignItems:'center', marginBottom: 10}}> 
          <Ionicon.Button name='md-add' onPress={()=>this.setState({addingItem: true})}>ATTACH CONTACT</Ionicon.Button>
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