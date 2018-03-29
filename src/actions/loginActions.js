import {AUTH_START, AUTH_END, LOGOUT} from './types';
import axios from 'axios';
import config from '../AppConfig';

export function logout(){
  return {
    type: LOGOUT
  }
}

export function login(userName, password){
  return function(dispatch){
    dispatch({type: AUTH_START});
    axios
      .get(config.apiUrl, { params: {
        operation: 'login',
        username: userName,
        password: password
      }})
      .then(response => {
        dispatch({
          type: AUTH_END,
          authToken: response.data.token,
          justCreatedUser: false,
          userName: userName
        });
      })
      .catch(error => {console.log(error);});
  }
}

export function createUser(userName, password){
  return function(dispatch){
    dispatch({type: AUTH_START});
    axios
      .get(config.apiUrl, { params: {
        operation: 'createnewuser',
        username: userName,
        password: password
      }})
      .then(response => {
        dispatch({
          type: AUTH_END,
          authToken: response.data.token,
          justCreatedUser: response.data.token ? true : false,
          userName: userName
        });
      })
      .catch(error => {console.log(error);});
  }
}