import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import styled from 'styled-components';

import { addTodo } from '../redux/actions';
import { Options, InputMaxLength } from './helpers';

import '../../node_modules/react-datetime/css/react-datetime.css';
import CalendarIcon from '../assets/img/calendar.svg';
import DoneIcon from '../assets/img/done.svg';

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 20px;
`;

const StyledForm = styled.form`
  border-bottom: 1px solid #000;
`;

const StyledTextInput = styled.input`
  width: 340px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #000;
  outline: none;
  display: block;
  margin: 2px;
`;

const StyledSelect = styled.select`
  height: 30px;
  border: 0;
  border-radius: 0;
  margin: 8px;
  box-sizing: content-box;
  background: none;
  cursor: pointer;
  min-width: 16px;
  user-select: none;
  outline: 0
`;

const PriorityBlock = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

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

const StyledCalendar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export class Input extends Component {
  static propTypes = {
    dispatch: func.isRequired
  }

  state = {
    title: '',
    priority: Options[0],
    state: false,
    deadline: '',
    isOpenCalendar: false
  }

  titleHandle = event => this.setState({ title: event.target.value })

  selectHandle = event => this.setState({ priority: event.target.value })

  deadlineHandle = moment => this.setState({ deadline: moment.format('HH:mm DD.MM.YYYY') })

  openCalendarHandle = () => {
    const { isOpenCalendar } = this.state;
    this.setState({ isOpenCalendar: !isOpenCalendar });
  }

  render() {
    const {
      title,
      priority,
      state,
      deadline,
      isOpenCalendar
    } = this.state;
    const { dispatch } = this.props;
    const yesterday = Datetime.moment().subtract(1, 'hour');
    const valid = current => current.isAfter(yesterday);
    return (
      <Container>
        <StyledForm onSubmit={(e) => {
          e.preventDefault();
          if (!title) { return; }
          dispatch(addTodo(title, priority, state, deadline));
          this.setState({
            title: '',
            priority: Options[0],
            state: false,
            deadline: ''
          });
        }}
        >
          <StyledTextInput
            placeholder="Todo"
            onChange={this.titleHandle}
            value={title}
            type="text"
            maxLength={InputMaxLength}
            required
          />
          <PriorityBlock>
            <StyledSelect onChange={this.selectHandle}>
              <option disabled selected="selected">Priority</option>
              {Options.map(item => <option value={item} key={item}>{item}</option>)}
            </StyledSelect>
            <Button onClick={this.openCalendarHandle} type="button">
              <ButtonImg src={CalendarIcon} alt="edit" />
            </Button>
          </PriorityBlock>
          <StyledCalendar>
            <Datetime
              defaultValue={false}
              onChange={this.deadlineHandle}
              isValidDate={valid}
              input={false}
              open={isOpenCalendar}
            />
          </StyledCalendar>
          <Button type="submit">
            <ButtonImg src={DoneIcon} alt="edit" />
          </Button>
        </StyledForm>
      </Container>
    );
  }
}

export const TodoInput = connect()(Input);
