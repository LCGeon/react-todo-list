import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import * as dayjs from 'dayjs';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoMenu from './components/TodoMenu';
import Uni from './img/uni_1.png';
import Uni2 from './img/uni_2.png';
import Uni3 from './img/uni_3.png';

const S = {
  layout: styled.div`
    position: relative;
    max-width: 700px;
    min-width: 500px;
    background-color: white;
    border: 4px solid;
    border-radius: 20px;
    margin: auto;
    margin-top: 50px;
    height: 640px;
    width: 100%;
    z-index: 1;
    box-shadow: 3px 3px 3px 3px rgb(59, 59, 59);
  `,
  todoBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  mainImg: styled.img`
    width: ${(props) => props.width || '240px'};
    height: ${(props) => props.height || '250px'};
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    right: ${(props) => props.right || '0px'};
    z-index: 1;
  `,
};
const initialTodoData = localStorage.getItem('todoData')
  ? JSON.parse(localStorage.getItem('todoData'))
  : [];

function App() {
  const [todoData, setTodoData] = useState(initialTodoData); // 리스트
  const [value, setValue] = useState(''); // 인풋 밸류값
  const [importance, setImportance] = useState('1'); // 중요도
  const [timer, setTimer] = useState('0'); // 현재 시각 가져오기
  const [completed, setCompleted] = useState(true); // 완료 된 일정 필터
  const [sortDate, setSortDate] = useState(true); // 날짜 sort
  const [toggleImportance, setToggleImportance] = useState(true); // 중요도 필터 on/off
  const [page, setPage] = useState(1); // 페이지네이션
  const [limit] = useState(5); // 한 페이지에 보여줄 최대 갯수
  const [toggleNum, setToggleNum] = useState(0);

  const currentTimer = () => {
    // dayjs
    return dayjs().format('MM/DD HH:mm:ss');
  };
  useEffect(() => {
    const currentTime = currentTimer();
    setTimer(currentTime);
  });

  // input submit
  const handleSubmit = (e) => {
    if (todoData.length >= 50) {
      alert('최대 10페이지 까지 입력이 가능합니다.');
      return clearInterval();
    }
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
      date: timer,
      importance: importance,
    };
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue('');
    setPage(todoData.length >= 5 ? parseInt(todoData.length / 5 + 1) : 1); // 입력시 마지막 페이지로 지정
  };

  // 드래깅
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
    },
    [todoData]
  );

  const completeFilter = () => {
    // 미완료 일정 보기
    if (completed) {
      const copy = [...todoData];
      setTodoData(copy.filter((data) => !data.completed));
    } else {
      setTodoData(JSON.parse(localStorage.getItem('todoData')));
    }
    setCompleted(!completed);
    setPage(1);
  };
  const sortByDate = () => {
    // 날짜 내림차순 오름차순
    const date = [...todoData];
    if (sortDate) {
      date.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      date.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setTodoData(date);
    setSortDate(!sortDate);
  };

  const filterByImportance = (e) => {
    // 중요도 필터
    const copy = [...todoData];
    if (toggleImportance) {
      setTodoData(copy.filter((data) => data.importance === `${e}`));
      setToggleNum(e);
    } else {
      setTodoData(JSON.parse(localStorage.getItem('todoData')));
    }
    setToggleImportance(!toggleImportance);
    setPage(1);
  };
  return (
    <>
      <S.layout>
        <S.todoBox>
          <div>
            <h1
              style={{
                fontFamily: 'PyeongChangPeace-Bold',
                fontSize: '45px',
                margin: '15px',
                padding: '0px',
              }}
            >
              To Do It !
            </h1>
          </div>
          <TodoMenu
            setTodoData={setTodoData}
            completeFilter={completeFilter}
            completed={completed}
            sortByDate={sortByDate}
            filterByImportance={filterByImportance}
            toggleImportance={toggleImportance}
            toggleNum={toggleNum}
          ></TodoMenu>
          <TodoList
            todoData={todoData}
            setTodoData={setTodoData}
            handleClick={handleClick}
            page={page}
            setPage={setPage}
            limit={limit}
          ></TodoList>
          <TodoInput
            value={value}
            setValue={setValue}
            handleSubmit={handleSubmit}
            importance={importance}
            setImportance={setImportance}
          ></TodoInput>
        </S.todoBox>
      </S.layout>
    </>
  );
}

export default App;
