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
    case C.CHANGE_TODO:
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            id: action.id,
            title: action.title,
            priority: action.priority,
            state: action.state,
            deadline: action.deadline
          };
        }
        return state;
      });
    case C.DELETE_TODO:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};
