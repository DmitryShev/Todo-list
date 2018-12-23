import React, { Component } from 'react';
import { func, string } from 'prop-types';
import Datetime from 'react-datetime';

import { Options, InputMaxLength } from '../../containers/helpers';

export class TodoForm extends Component {
  static propTypes = {
    editTodo: func.isRequired,
    id: string.isRequired,
    isEdit: func.isRequired
  };

  state = {
    title: '',
    priority: '',
    state: false,
    deadline: '',
  }

  titleHandle = event => this.setState({ title: event.target.value })

  selectHandle = event => this.setState({ priority: event.target.value })

  deadlineHandle = moment => this.setState({ deadline: moment.format('HH:mm DD.MM.YYYY') })

  render() {
    const { editTodo, id, isEdit } = this.props;
    const {
      title,
      priority,
      state,
      deadline
    } = this.state;
    const yesterday = Datetime.moment().subtract(1, 'hour');
    const valid = current => current.isAfter(yesterday);
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!title) { return; }
        editTodo(id, title, priority, state, deadline);
        isEdit();
      }}
      >
        <input onChange={this.titleHandle} maxLength={InputMaxLength} required />
        <select onChange={this.selectHandle} value={priority}>
          {Options.map(item => <option value={item} key={item}>{item}</option>)}
        </select>
        <span>
          <Datetime
            onChange={this.deadlineHandle}
            isValidDate={valid}
            input={false}
          />
        </span>
        <button type="submit">EditTodo Todo</button>
      </form>
    );
  }
}
