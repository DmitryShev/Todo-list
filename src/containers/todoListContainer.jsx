import { connect } from 'react-redux';

import {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo
} from '../redux/actions';
import { TodosList } from '../components/todosList';

const mapStateToProps = state => ({
  todos: state
});

const mapDispatchToProps = dispatch => ({
  addTodo: (title, priority, state, deadline) => {
    dispatch(addTodo(title, priority, state, deadline));
  },
  editTodo: (id, title, priority, state, deadline) => {
    dispatch(editTodo(id, title, priority, state, deadline));
  },
  completeTodo: id => dispatch(completeTodo(id)),
  deleteTodo: id => dispatch(deleteTodo(id))
});

export const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList);
