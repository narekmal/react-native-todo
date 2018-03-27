import {TOGGLE_LIST_ITEM_COMPLETED, ADD_ITEM, DELETE_ITEM, EDIT_ITEM} from './types';
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

export function editItem(listId, itemId, name, content){
  return function(dispatch){
    dispatch({
      type: EDIT_ITEM,
      listId, itemId, name, content
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'edititem',
        token: store.getState().authToken,
        listId, itemId, name, content
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}