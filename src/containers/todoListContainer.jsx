import { connect } from 'react-redux';

import { addTodo, deleteTodo, changeTodo } from '../redux/actions';
import { TodosList } from '../components/todosList';

const mapStateToProps = state => ({
  todos: state
});

const mapDispatchToProps = dispatch => ({
  addTodo: (title, priority, state, deadline) => {
    dispatch(addTodo(title, priority, state, deadline));
  },
  changeTodo: (id, title, priority, state, deadline) => {
    dispatch(changeTodo(id, title, priority, state, deadline));
  },
  deleteTodo: id => dispatch(deleteTodo(id))
});

export const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList);
