import {LOGIN_START, LOGIN_END} from '../actions/types';

var skipLogin = {userName: 'test1', token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxIn0.o3aipk9-2J4JFIdz5nOOHtdK2uFzttOqX7ZcHRcDUKk'};

const initialState = {
    authToken: '',
    authenticating: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case LOGIN_START:
            return {
                ...state,
                authenticating: true
            };
        case LOGIN_END:
            console.log(action.payload.token);
            return {
                ...state,
                authenticating: false,
                authToken: action.payload.token
            };
        default:
            return state;
    }
}