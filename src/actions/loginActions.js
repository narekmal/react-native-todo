import {LOGIN_START, LOGIN_END} from './types';
import axios from 'axios';
import config from '../AppConfig';

export default function login(userName, password){
    return function(dispatch){
        dispatch({type: LOGIN_START});
        console.log('apiUrl', config);
        axios
            .get(config.apiUrl, { params: {
                operation: 'login',
                username: userName,
                password: password
            }})
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: LOGIN_END,
                    payload: response.data
                });
            })
            .catch(error => {console.log(error);});
    }
}