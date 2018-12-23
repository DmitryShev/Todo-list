/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';

import { TodoForm } from './elements/todoForm';

import EditIcon from '../assets/img/edit.svg';
import RemoveIcon from '../assets/img/remove.svg';
// import Rectangle from '../assets/img/rect.svg';
import DoneIcon from '../assets/img/done.svg';


const Wrap = styled.li`
  list-style-type: none;
  margin: 10px 0;
  border-top: 0.2px solid #cccccc;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
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

const TodoText = styled.p`
  // flex: 0 0 400px;
  flex: 1;
  width: 320px;
  margin: 6px;
  text-decoration: ${({ isComplete }) => (isComplete ? 'line-through' : 'none')}
`;

const TodoPriority = styled.p`
  margin: 6px;
  width: 60px;
`;

const TodoState = styled.p`
  margin: 6px;
  width: 60px;
`;

const TodoDeadline = styled.p`
  margin: 6px;
  width: 80px;
`;

/* const Rect = styled.img`
  width: 16px;
  height: 16px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(360deg)' : 'rotate(180deg)')};
  transition: transform 0.3s linear;
`; */

export class Todo extends Component {
  static propTypes = {
    title: string.isRequired,
    priority: string.isRequired,
    state: bool.isRequired,
    deadline: string.isRequired,
    id: string.isRequired,
    deleteTodo: func.isRequired,
    editTodo: func.isRequired,
    completeTodo: func.isRequired
  }

  state = {
    isOpen: true,
    isEdit: false
  }

  closeHandle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  editModeHandle = () => {
    const { isEdit } = this.state;
    this.setState({ isEdit: !isEdit });
  }

  render() {
    const {
      title,
      priority,
      state,
      deadline,
      deleteTodo,
      editTodo,
      completeTodo,
      id
    } = this.props;
    const { isOpen, isEdit } = this.state;
    return (
      <Wrap>
        <Container>
          {/* <Rect src={Rectangle} isOpen={isOpen} /> */}
          {isOpen ? (
            <React.Fragment>
              <Button type="button" onClick={() => confirm('Are you sure?') && deleteTodo(id)}>
                <ButtonImg src={RemoveIcon} alt="edit" />
              </Button>
              <TodoText isComplete={state}>{title}</TodoText>
              <TodoPriority>{priority}</TodoPriority>
              <TodoState>{state}</TodoState>
              <TodoDeadline>{deadline}</TodoDeadline>
              <Button type="button" onClick={this.editModeHandle}>
                <ButtonImg src={EditIcon} alt="edit" />
              </Button>
              <Button type="button" onClick={() => completeTodo(id)}>
                <ButtonImg src={DoneIcon} alt="edit" />
              </Button>
            </React.Fragment>
          ) : (
            <div>Task</div>
          )}
        </Container>
        {isEdit && (
          <TodoForm
            id={id}
            editTodo={editTodo}
            title={title}
            priority={priority}
            state={state}
            deadline={deadline}
            isEdit={this.editModeHandle}
          />
        )}
      </Wrap>
    );
  }
}
