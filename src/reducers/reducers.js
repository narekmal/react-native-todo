import {LOGIN_START, LOGIN_END, LOGOUT, FETCH_LISTS_END, ADD_LIST, DELETE_LIST} from '../actions/types';

var skipLogin = {userName: 'test1', token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxIn0.o3aipk9-2J4JFIdz5nOOHtdK2uFzttOqX7ZcHRcDUKk'};
// var skipLogin = false;

const initialState = {
  authToken: skipLogin ? skipLogin.token : '',
  userName: skipLogin ? skipLogin.userName : '',
  authenticating: false,
  lists: {}
}

export default function(state = initialState, action) {
  switch(action.type){
    case LOGIN_START:
      return {
        ...state,
        authenticating: true
      };
    case LOGIN_END:
      return {
        ...state,
        authenticating: false,
        authToken: action.authToken,
        userName: action.authToken ? action.userName : ''
      };
    case LOGOUT:
      console.log(action);
      return {
        ...state,
        userName: '',
        authToken: '',
        lists: {}
      };
    case FETCH_LISTS_END:
      console.log(action);
      return {
        ...state,
        lists: action.lists
      };
    case ADD_LIST:
      console.log({
        ...state.lists,
        [action.id]: {name:action.name, items: {}}
      });
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.id]: {name: action.name, items: {}}
        }
      };
    case DELETE_LIST:
      var lists = {...state.lists};
      delete lists[action.id];
      console.log(lists);
      return {...state, lists: lists};
    default:
      return state;
  }
}