import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FiSave } from 'react-icons/fi';
import { BiEditAlt } from 'react-icons/bi';

const S = {
  btnStyle: styled.button`
    width: 30px;
    height: 30px;
    border: none;
    padding: 2px;
    margin-left: 5px;
    background: none;
    cursor: pointer;
    float: right;
    color: rgb(93, 86, 212);
  `,
  listStyled: styled.div`
    margin: 10px;
    border-bottom: 1px #ccc dotted;
    text-decoration: none;
  `,
  checkBoxStyle: styled.input`
    appearance: none;
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 6px;

    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: #a08bff;
    }
  `,
  list: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  layout: styled.div`
    width: 90%;
    height: 430px;
    border: 1px solid;
    margin: 0px 0px 10px 0px;
  `,
  date: styled.div`
    font-family: 'SBAggroB';
    font-size: 12px;
    color: gray;
    margin: 0px 0px 0px 90px;
    padding: 0;
  `,
  titleComplete: styled.span`
    font-family: 'Dovemayo_gothic';
    text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
    color: ${(props) => (props.color ? 'gray' : 'black')};
    margin: 0px 0px 0px 10px;
    padding: 6px 0px 0px 0px;
    font-size: 22px;
  `,
  titleWrapper: styled.div`
    display: flex;
  `,
  importanceBox: styled.div`
    font-size: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 0px 15px 0px 0px;
  `,
  editInput: styled.input`
    width: 350px;
    height: 40px;
    margin-left: 85px;
    margin-bottom: 10px;
    border: 3px solid #a08bff;
    font-size: 19px;
    &:focus {
      outline: none;
      border: 3px solid #4a7bf8;
    }
  `,
};
const TodoListItem = ({
  data: { id, title, completed, date, importance },
  todoData,
  setTodoData,
  provided,
  snapshot,
  handleClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const handleCompleteChane = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
    setIsEditing(false);
  };
  if (isEditing) {
    return (
      <S.listStyled>
        <S.list>
          <div>
            <form onSubmit={handleSubmit}>
              <S.editInput
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </form>
          </div>
          <div>
            <S.btnStyle onClick={() => handleClick(id)}>
              <BsFillTrash3Fill style={{ width: '17px', height: '17px' }} />
            </S.btnStyle>
            <S.btnStyle type='submit' onClick={handleSubmit}>
              <FiSave style={{ width: '20px', height: '20px' }} />
            </S.btnStyle>
          </div>
        </S.list>
      </S.listStyled>
    );
  } else {
    return (
      <S.listStyled
        props={completed ? 1 : 0}
        key={id}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <S.list
          style={
            snapshot.isDragging
              ? { backgroundColor: '#D8D8D8' }
              : { backgroundColor: '#fff' }
          }
        >
          <S.titleWrapper>
            <S.importanceBox>
              {importance === '1' ? (
                <span>🔵</span>
              ) : importance === '2' ? (
                <span>🟢</span>
              ) : importance === '3' ? (
                <span>🟡</span>
              ) : importance === '4' ? (
                <span style={{ marginLeft: '3px' }}>🔥</span>
              ) : null}
            </S.importanceBox>
            <S.checkBoxStyle
              type='checkbox'
              defaultChecked={false}
              onChange={() => handleCompleteChane(id)}
              checked={completed}
            />
            {}
            <S.titleComplete completed={completed} color={completed}>
              {title}
            </S.titleComplete>
          </S.titleWrapper>
          <div>
            <S.btnStyle onClick={() => handleClick(id)}>
              <BsFillTrash3Fill style={{ width: '17px', height: '17px' }} />
            </S.btnStyle>
            <S.btnStyle onClick={() => setIsEditing(true)}>
              <BiEditAlt style={{ width: '23px', height: '23px' }} />
            </S.btnStyle>
          </div>
        </S.list>
        <S.date> {date}</S.date>
      </S.listStyled>
    );
  }
};

export default TodoListItem;
