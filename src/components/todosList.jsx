import React from 'react';
// import { objectOf, arrayOf, array } from 'prop-types';

import { Todo } from './todo';


/* export const TodosList = ({ todos }) => (
  <ul>
    {
      todos.map(item => <Todo text={item.text} key={item.id} />)
    }
  </ul>
);
*/

export class TodosList extends React.PureComponent {
  render() {
    const { todos, deleteTodo, changeTodo } = this.props;
    return (
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
            changeTodo={changeTodo}
          />))}
      </ul>);
  }
}

/* TodosList.propTypes = {
  todos: arrayOf.isRequired
}; */
