import React from 'react';
import { func, arrayOf, object } from 'prop-types';

import { Todo } from './todo';


export const TodosList = ({
  todos,
  deleteTodo,
  editTodo,
  completeTodo
}) => (
  <ul>
    {todos.map(item => (
      <Todo
        title={item.title}
        priority={item.priority}
        state={item.state}
        deadline={item.deadline}
        id={item.id}
        key={item.id}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        completeTodo={completeTodo}
      />))}
  </ul>
);


TodosList.propTypes = {
  todos: arrayOf(object).isRequired,
  deleteTodo: func.isRequired,
  editTodo: func.isRequired,
  completeTodo: func.isRequired
};
