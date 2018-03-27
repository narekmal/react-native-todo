import {LOGIN_START, LOGIN_END, LOGOUT, FETCH_LISTS_END, ADD_LIST, DELETE_LIST, RENAME_LIST,
  TOGGLE_LIST_ITEM_COMPLETED, ADD_ITEM, DELETE_ITEM, EDIT_ITEM} from '../actions/types';

//var skipLogin = {userName: 'test1', token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxIn0.o3aipk9-2J4JFIdz5nOOHtdK2uFzttOqX7ZcHRcDUKk'};
var skipLogin = false;

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
      return {
        ...state,
        userName: '',
        authToken: '',
        lists: {}
      };
    case FETCH_LISTS_END:
      return {
        ...state,
        lists: action.lists
      };
    case ADD_LIST:
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
      return {...state, lists: lists};
    case RENAME_LIST:
      return {...state, lists: {
        ...state.lists,
        [action.id]: {
          ...state.lists[action.id],
          name: action.name
        }
      }};
    case TOGGLE_LIST_ITEM_COMPLETED:
      var item = {...state.lists[action.listId].items[action.itemId]};
      if(typeof item.completed !== 'undefined')
        item.completed = !item.completed;
      else
        item.completed = true;
      
      return {
        ...state,
        lists:{
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: {
              ...state.lists[action.listId].items,
              [action.itemId]: item
            }
          }
        }
      };
    case ADD_ITEM:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: {
              ...state.lists[action.listId].items,
              [action.itemId]: {
                name: action.name,
                completed: false,
                content: ''
              }
            }
          }
        }
      };
    case DELETE_ITEM:
      var newItems = {...state.lists[action.listId].items};
      delete newItems[action.itemId];
      return {
        ...state, 
        lists: {
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: newItems
          }
        }
      };
    case EDIT_ITEM:
      var newItem = {...state.lists[action.listId].items[action.itemId]};
      if(action.name !== null)
        newItem.name = action.name;
      if(action.content !== null)
        newItem.content = action.content;

      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: {
              ...state.lists[action.listId].items,
              [action.itemId]: newItem
            }
          }
        }
      };
    default:
      return state;
  }
}