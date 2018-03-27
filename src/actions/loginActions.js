import {LOGIN_START, LOGIN_END, LOGOUT} from './types';
import axios from 'axios';
import config from '../AppConfig';

export function login(userName, password){
    return function(dispatch){
        dispatch({type: LOGIN_START});
        axios
            .get(config.apiUrl, { params: {
                operation: 'login',
                username: userName,
                password: password
            }})
            .then(response => {
                dispatch({
                    type: LOGIN_END,
                    authToken: response.data.token,
                    userName: userName
                });
            })
            .catch(error => {console.log(error);});
    }
}

export function logout(){
  return {
    type: LOGOUT
  }
}