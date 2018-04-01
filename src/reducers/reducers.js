import {AUTH_START, AUTH_END, LOGOUT, FETCH_LISTS_END, ADD_LIST, DELETE_LIST, RENAME_LIST,
  TOGGLE_LIST_ITEM_COMPLETED, ADD_ITEM, DELETE_ITEM, RENAME_ITEM, EDIT_ITEM_CONTENT,
  ADD_ITEM_IMAGE, ADD_ITEM_CONTACT, DELETE_ITEM_IMAGE, DELETE_ITEM_CONTACT} from '../actions/types';

//var skipLogin = {userName: 'test1', token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxIn0.o3aipk9-2J4JFIdz5nOOHtdK2uFzttOqX7ZcHRcDUKk'};
var skipLogin = false;

const initialState = {
  authToken: skipLogin ? skipLogin.token : '',
  userName: skipLogin ? skipLogin.userName : '',
  authActionActive: false,
  justCreatedUser: false,
  lists: {}
}

export default function(state = initialState, action) {
  switch(action.type){
    case AUTH_START:
      return {
        ...state,
        authActionActive: true
      };
    case AUTH_END:
      return {
        ...state,
        authActionActive: false,
        authToken: action.authToken,
        userName: action.authToken ? action.userName : '',
        justCreatedUser: action.justCreatedUser
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
                content: '',
                images: {},
                contacts: {}
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
    case RENAME_ITEM:
      var newItem = {...state.lists[action.listId].items[action.itemId]};
      newItem.name = action.name;

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
    case EDIT_ITEM_CONTENT:
      var newItem = {...state.lists[action.listId].items[action.itemId]};
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
    case ADD_ITEM_IMAGE:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: {
              ...state.lists[action.listId].items,
              [action.itemId]: {
                ...state.lists[action.listId].items[action.itemId],
                images: {
                  ...state.lists[action.listId].items[action.itemId].images,
                  [action.imageId]: action.imageData
                }
              }
            }
          }
        }
      };
    case DELETE_ITEM_IMAGE:
      var newImages = {...state.lists[action.listId].items[action.itemId].images};
      delete newImages[action.imageId];
      return {
        ...state, 
        lists: {
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: {
              ...state.lists[action.listId].items,
              [action.itemId] :{
                ...state.lists[action.listId].items[action.itemId],
                images: newImages
              }
            }
          }
        }
      };
    case ADD_ITEM_CONTACT:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: {
              ...state.lists[action.listId].items,
              [action.itemId]: {
                ...state.lists[action.listId].items[action.itemId],
                contacts: {
                  ...state.lists[action.listId].items[action.itemId].contacts,
                  [action.contactId]: action.contact
                }
              }
            }
          }
        }
      };
    case DELETE_ITEM_CONTACT:
      var newContacts = {...state.lists[action.listId].items[action.itemId].contacts};
      delete newContacts[action.contactId];
      return {
        ...state, 
        lists: {
          ...state.lists,
          [action.listId]: {
            ...state.lists[action.listId],
            items: {
              ...state.lists[action.listId].items,
              [action.itemId] :{
                ...state.lists[action.listId].items[action.itemId],
                contacts: newContacts
              }
            }
          }
        }
      };
    default:
      return state;
  }
}