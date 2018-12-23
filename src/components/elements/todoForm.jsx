/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { func, string } from 'prop-types';
import Datetime from 'react-datetime';
import styled from 'styled-components';

import { Options, InputMaxLength } from '../../containers/helpers';
import CalendarIcon from '../../assets/img/calendar.svg';
import SaveIcon from '../../assets/img/save.svg';
import ClearDateIcon from '../../assets/img/clearDate.svg';

const Button = styled.button`
  color: #fff;
  background-color: #2196f3;
  flex: 0 0 32px;
  margin: 8px;
  width: 32px;
  height: 32px;
  
  border-radius: 4px;
  border: 0;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);

  outline: none;
  cursor: pointer;
  :hover {
    background-color: #909090
  }
  :active {
    box-shadow: inset 1px 1px 10px -1px
  }
`;

const ButtonImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledSelect = styled.select`
  min-width: 0;
  height: 1.1875em;
  border: 0;
  border-radius: 0;
  margin: 0;
  

  box-sizing: content-box;
  background: none;
  cursor: pointer;
  min-width: 16px;
  user-select: none;
  padding-right: 32px;
  outline: 0
`;

export class TodoForm extends Component {
  static propTypes = {
    editTodo: func.isRequired,
    id: string.isRequired,
    isEdit: func.isRequired,
    title: string.isRequired
  };

  state = {
    title: this.props.title,
    priority: '',
    state: false,
    deadline: '',
    isOpenCalendar: false,
  }

  titleHandle = event => this.setState({ title: event.target.value })

  selectHandle = event => this.setState({ priority: event.target.value })

  deadlineHandle = moment => this.setState({ deadline: moment.format('HH:mm DD.MM.YYYY') })

  onClearDeadline = () => this.setState({ deadline: '' })

  openCalendarHandle = () => {
    const { isOpenCalendar } = this.state;
    this.setState({ isOpenCalendar: !isOpenCalendar });
  }

  render() {
    const { editTodo, id, isEdit } = this.props;
    const {
      title,
      priority,
      state,
      deadline,
      isOpenCalendar
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
        <input
          onChange={this.titleHandle}
          maxLength={InputMaxLength}
          defaultValue={this.props.title}
          required
        />
        <StyledSelect onChange={this.selectHandle}>
          <option disabled selected="selected">Priority</option>
          {Options.map(item => <option value={item} key={item}>{item}</option>)}
        </StyledSelect>
        <Button onClick={this.openCalendarHandle} type="button">
          <ButtonImg src={CalendarIcon} alt="edit" />
        </Button>
        <span>
          <Datetime
            onChange={this.deadlineHandle}
            isValidDate={valid}
            input={false}
            open={isOpenCalendar}
          />
        </span>
        <Button onClick={this.onClearDeadline} type="button" alt="clear date">
          <ButtonImg src={ClearDateIcon} alt="edit" />
        </Button>
        <Button type="submit">
          <ButtonImg src={SaveIcon} alt="edit" />
        </Button>
      </form>
    );
  }
}
