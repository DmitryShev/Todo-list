import React, { Component } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';

import { TodoForm } from './elements/todoForm';

import EditIcon from '../assets/img/edit.svg';
import Rectangle from '../assets/img/rect.svg';


const Wrap = styled.li`
  list-style-type: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const EditButton = styled.button`
  color: #fff;
  background-color: #2196f3;

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

const EditButtonImg = styled.img`
  width: 100%;
  height: 100%;
`;

const TodoText = styled.p`
  margin: 6px;
`;

const TodoPriority = styled.p`
  margin: 6px;
`;

const TodoState = styled.p`
  margin: 6px;
`;

const TodoDeadline = styled.p`
  margin: 6px;
`;

const Rect = styled.img`
  width: 16px;
  height: 16px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(360deg)' : 'rotate(180deg)')};
  transition: transform 0.3s linear;
`;

export class Todo extends Component {
  static propTypes = {
    title: string.isRequired,
    priority: string.isRequired,
    state: string.isRequired,
    deadline: string.isRequired,
    id: string.isRequired,
    deleteTodo: func.isRequired,
    changeTodo: func.isRequired
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
      changeTodo,
      id
    } = this.props;
    const { isOpen, isEdit } = this.state;
    return (
      <Wrap>
        <Container>
          <Rect src={Rectangle} isOpen={isOpen} />
          {isOpen ? (
            <React.Fragment>
              <EditButton type="button" onClick={() => deleteTodo(id)}>
                <EditButtonImg src={EditIcon} alt="edit" />
              </EditButton>
              <TodoText>{title}</TodoText>
              <TodoPriority>{priority}</TodoPriority>
              <TodoState>{state}</TodoState>
              <TodoDeadline>{deadline}</TodoDeadline>
              <button type="button" onClick={this.editModeHandle}>change todo</button>
              {isEdit && (
                <TodoForm
                  id={id}
                  changeTodo={changeTodo}
                  title={title}
                  priority={priority}
                  state={state}
                  deadline={deadline}
                />
              )}
            </React.Fragment>
          ) : (
            <div>Task</div>
          )}
        </Container>
      </Wrap>
    );
  }
}
