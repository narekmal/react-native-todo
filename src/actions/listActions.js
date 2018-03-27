import {FETCH_LISTS_END, ADD_LIST, DELETE_LIST, RENAME_LIST} from './types';
import axios from 'axios';
import config from '../AppConfig';
import store from '../store/store';
const uuidv = require('uuid/v4');

export function getLists(){
    return function(dispatch){
        axios
            .get(config.apiUrl, { params: {
                operation: 'getall',
                token: store.getState().authToken
            }})
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: FETCH_LISTS_END,
                    lists: response.data
                });
            })
            .catch(error => {console.log(error);});
    }
}

export function addList(name){
  return function(dispatch){
    var uuid = uuidv();
    dispatch({
      type: ADD_LIST,
      name: name,
      id: uuid
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'addlist',
        token: store.getState().authToken,
        listId: uuid,
        listName: name
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function deleteList(id){
  return function(dispatch){
    dispatch({
      type: DELETE_LIST,
      id: id
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'deletelist',
        token: store.getState().authToken,
        listId: id
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}

export function renameList(id, name){
  return function(dispatch){
    dispatch({
      type: RENAME_LIST,
      id: id,
      name: name
    });
    axios
      .get(config.apiUrl, { params: {
        operation: 'renamelist',
        token: store.getState().authToken,
        listId: id,
        listName: name
      }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {console.log(error);});
  }
}
