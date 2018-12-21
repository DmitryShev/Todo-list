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

export const changeTodo = (id, title, priority, state, deadline) => ({
  type: C.CHANGE_TODO,
  id,
  title,
  priority,
  state,
  deadline
});

export const deleteTodo = id => ({
  type: C.DELETE_TODO,
  id
});
