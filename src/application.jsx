import React from 'react';
import { hot } from 'react-hot-loader';

import { TodoInput } from './containers/todoInput';
import { TodoListContainer } from './containers/todoListContainer';

import './assets/css/styles.css';

export const Application = hot(module)(() => (
  <React.Fragment>
    <TodoInput />
    <TodoListContainer />
  </React.Fragment>
));
