/* eslint-disable no-return-assign */
import { v4 } from 'node-uuid';

import { Constants as C } from '../constants';


export const addTodo = (title, priority, state, deadline) => ({
  type: C.ADD_TODO,
  id: v4(),
  title,
  priority,
  state,
  deadline
});

export const editTodo = (id, title, priority, state, deadline) => ({
  type: C.EDIT_TODO,
  id,
  title,
  priority,
  state,
  deadline
});

export const completeTodo = id => ({
  type: C.COMPLETE_TODO,
  id,
});

export const deleteTodo = id => ({
  type: C.DELETE_TODO,
  id
});
