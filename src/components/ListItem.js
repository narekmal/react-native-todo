import React from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Image } from 'react-native';
import {connect} from 'react-redux';
import {renameItem, editItemContent, addItemImage, 
  deleteItemImage, addItemContact, deleteItemContact} from '../actions/listItemActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ContactsWrapper from 'react-native-contacts-wrapper';
var ImagePicker = require('react-native-image-picker');

class ListItem extends React.Component {
  static navigationOptions = {
    title: 'List Item',
  };

  constructor(props){
    super(props);

    let listId = this.props.navigation.state.params.listId;
    let itemId = this.props.navigation.state.params.itemId;
    let item = this.props.lists[listId].items[itemId];

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

    this.props.renameItem(listId, itemId, newName);
  }

  handleSubmitContentChange(){
    let newContent = this.state.itemContent;
    let listId = this.props.navigation.state.params.listId;
    let itemId = this.props.navigation.state.params.itemId;

    this.props.editItemContent(listId, itemId, newContent);
  }

  attachImage(){
    var options = {
      title: 'Select Image',
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
        console.log(response.uri);
        let { params } = this.props.navigation.state;
        this.props.addItemImage(params.listId, params.itemId, response.data);
      }
    });
  }

  attachContact(){
    ContactsWrapper.getContact()
      .then((contact) => {
        console.log("contact is", contact);
        let { params } = this.props.navigation.state;
        this.props.addItemContact(params.listId, params.itemId, JSON.stringify(contact));
      })
      .catch((error) => {
        console.log("ERROR: ", error.code, error.message);
      });
  }

  render() {
    let { params } = this.props.navigation.state;

    if (!params)
      return null;

    let item = this.props.lists[params.listId].items[params.itemId];
    console.log('--', this.props.lists[params.listId].items, params);

    let images = Object.keys(item.images).map(
      (imageId, index) => (
        <View key={imageId} style={{position: 'relative'}}>
          <Image source={{uri: 'data:image/jpeg;base64,' + item.images[imageId]}} 
            style={{width: 80, height: 80, marginLeft: (index==0) ? 0 : 23, marginBottom: 23}} />
          <Ionicon 
            style={{position: 'absolute', right: -15, top: -15, backgroundColor: 'white', borderRadius: 17, width: 30, height: 31}} 
            name='md-close-circle' color='red'
            onPress={()=>{this.props.deleteItemImage(params.listId, params.itemId, imageId)}} 
            size={34} />
        </View>
      )
    );

    let contacts = Object.keys(item.contacts).map(
      (contactId) => {
        let contact = JSON.parse(item.contacts[contactId]);
        return (
          <View key={contactId} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Name: </Text><Text>{contact.name}  </Text>
            <Text style={{fontWeight: 'bold'}}>Phone: </Text><Text>{contact.phone} </Text>
            <Ionicon 
              onPress={()=>{this.props.deleteItemContact(params.listId, params.itemId, contactId)}} 
              name='md-close-circle' color='red' size={34} style={{marginLeft: 10}} />
          </View>
        );
      }
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
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", minHeight: 100}}>
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
          <Ionicon.Button name='md-add' onPress={this.attachContact.bind(this)}>ATTACH CONTACT</Ionicon.Button>
          <View style={{marginTop: 8, alignItems: 'center'}}>
            {contacts}
          </View>
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
    renameItem : (listId, itemId, name) => {
      dispatch(renameItem(listId, itemId, name));
    },
    editItemContent : (listId, itemId, content) => {
      dispatch(editItemContent(listId, itemId, content));
    },
    addItemImage : (listId, itemId, imageData) => {
      dispatch(addItemImage(listId, itemId, imageData));
    },
    deleteItemImage : (listId, itemId, imageId) => {
      dispatch(deleteItemImage(listId, itemId, imageId));
    },
    addItemContact : (listId, itemId, contact) => {
      dispatch(addItemContact(listId, itemId, contact));
    },
    deleteItemContact : (listId, itemId, contactId) => {
      dispatch(deleteItemContact(listId, itemId, contactId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);