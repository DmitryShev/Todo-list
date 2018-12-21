import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './localStorage';
import { todos as rootReducer } from './redux/reducers/todos';
import { Application } from './application';

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
