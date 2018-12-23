import { Constants as C } from '../constants';
import { initialState } from './initialState';

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          priority: action.priority,
          state: action.state,
          deadline: action.deadline
        }
      ];
    case C.EDIT_TODO:
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            // ...item,
            id: action.id,
            title: action.title,
            priority: action.priority,
            state: action.state,
            deadline: action.deadline
          };
        }
        return item;
      });
    case C.DELETE_TODO:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};
