import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';

import { addTodo } from '../redux/actions';
import { Options, State } from './helpers';

import '../../node_modules/react-datetime/css/react-datetime.css';


export class Input extends Component {
  static propTypes = {
    dispatch: func.isRequired
  }

  state = {
    title: '',
    priority: '',
    state: State.active,
    deadline: '',
  }

  titleHandle = event => this.setState({ title: event.target.value })

  selectHandle = event => this.setState({ priority: event.target.value })

  deadlineHandle = moment => this.setState({ deadline: moment.format('HH:mm DD.MM.YYYY') })

  render() {
    const {
      title,
      priority,
      state,
      deadline
    } = this.state;
    const { dispatch } = this.props;
    // console.log(this.state);
    const yesterday = Datetime.moment().subtract(1, 'hour');
    const valid = current => current.isAfter(yesterday);
    const maxLength = 50;
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!title) { return; }
          dispatch(addTodo(title, priority, state, deadline));
        }}
        >
          <input
            onChange={this.titleHandle}
            value={title}
            type="text"
            maxLength={maxLength}
            required
          />
          <select onChange={this.selectHandle} value={priority}>
            {Options.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
          <span>
            <Datetime
              defaultValue={false}
              onChange={this.deadlineHandle}
              isValidDate={valid}
              input={false}
            />
          </span>
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}

export const TodoInput = connect()(Input);
