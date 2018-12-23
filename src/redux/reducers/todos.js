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
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            id: action.id,
            title: action.title,
            priority: action.priority,
            state: action.state,
            deadline: action.deadline
          };
        }
        return todo;
      });
    case C.COMPLETE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            state: !todo.state
          };
        }
        return todo;
      });
    case C.DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};
