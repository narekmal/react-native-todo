import {TOGGLE_LIST_ITEM_COMPLETED, ADD_ITEM, DELETE_ITEM, RENAME_ITEM, EDIT_ITEM_CONTENT,
  ADD_ITEM_IMAGE, ADD_ITEM_CONTACT, DELETE_ITEM_IMAGE, DELETE_ITEM_CONTACT} from './types';
import axios from 'axios';
import config from '../AppConfig';
import store from '../store/store';
const uuidv = require('uuid/v4');

export function toggleListItemCompleted(listId, itemId){
  return function(dispatch){
    dispatch({
      type: TOGGLE_LIST_ITEM_COMPLETED,
      listId, itemId
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'toggleitemcomplete',
        token: store.getState().authToken,
        listId: listId,
        itemId: itemId
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function addItem(listId, name){
  return function(dispatch){
    var uuid = uuidv();
    dispatch({
      type: ADD_ITEM,
      listId: listId,
      name: name,
      itemId: uuid
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'additem',
        token: store.getState().authToken,
        listId: listId,
        itemId: uuid,
        itemName: name
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function deleteItem(listId, itemId){
  return function(dispatch){
    dispatch({
      type: DELETE_ITEM,
      listId, itemId
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'deleteitem',
        token: store.getState().authToken,
        listId, itemId
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function renameItem(listId, itemId, name){
  return function(dispatch){
    dispatch({
      type: RENAME_ITEM,
      listId, itemId, name
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'renameitem',
        token: store.getState().authToken,
        listId, itemId, 
        itemName: name
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function editItemContent(listId, itemId, content){
  return function(dispatch){
    dispatch({
      type: EDIT_ITEM_CONTENT,
      listId, itemId, content
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'edititemcontent',
        token: store.getState().authToken,
        listId, itemId, 
        itemContent: content
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function addItemImage(listId, itemId, imageData){
  return function(dispatch){
    var uuid = uuidv();
    dispatch({
      type: ADD_ITEM_IMAGE,
      listId: listId,
      itemId: itemId,
      imageId: uuid,
      imageData
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'additemimage',
        token: store.getState().authToken,
        listId: listId,
        itemId: itemId,
        imageId: uuid,
        imageData: imageData
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function deleteItemImage(listId, itemId, imageId){
  return function(dispatch){
    console.log('**', listId, itemId, imageId);
    dispatch({
      type: DELETE_ITEM_IMAGE,
      listId, itemId, imageId
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'deleteitemimage',
        token: store.getState().authToken,
        listId, itemId, imageId
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function addItemContact(listId, itemId, contact){
  return function(dispatch){
    var uuid = uuidv();
    dispatch({
      type: ADD_ITEM_CONTACT,
      listId: listId,
      itemId: itemId,
      contactId: uuid,
      contact
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'additemcontact',
        token: store.getState().authToken,
        listId: listId,
        itemId: itemId,
        contactId: uuid,
        contact: contact
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function deleteItemContact(listId, itemId, contactId){
  return function(dispatch){
    dispatch({
      type: DELETE_ITEM_CONTACT,
      listId, itemId, contactId
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'deleteitemcontact',
        token: store.getState().authToken,
        listId, itemId, contactId
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}