import React from 'react';
import styled from 'styled-components';

const S = {
  menuLayout: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
  `,
  btn: styled.button`
    border: none;
    background: ${(props) => (props.active ? 'rgb(99, 179, 250)' : 'none')};
    cursor: pointer;
    font-size: 16px;
    font-family: 'Cafe24Ssurround';
    border: 2px solid;
    box-shadow: 1px 1px 1px 1px gray;
    margin: 0px 3px 3px 3px;
  `,
};
const TodoMenu = ({
  setTodoData,
  completeFilter,
  completed,
  sortByDate,
  filterByImportance,
  toggleImportance,
  toggleNum,
}) => {
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
    window.location.replace('/');
  };

  const importantIconArray = ['🔵', '🟢', '🟡', '🔥'];
  return (
    <S.menuLayout>
      <div>
        <S.btn onClick={handleRemoveClick}>전체 삭제</S.btn>
      </div>
      <div style={{ marginBottom: '4px' }}>
        <S.btn onClick={completeFilter}>
          {completed ? <span>미완료 일정</span> : <span>전체 일정</span>}
        </S.btn>
        <S.btn onClick={sortByDate}>날짜 순</S.btn>

        {importantIconArray.map((data, index) => {
          return (
            <S.btn
              onClick={() => filterByImportance(index + 1)}
              active={toggleNum === index + 1 && !toggleImportance}
            >
              {data}
            </S.btn>
          );
        })}
      </div>
    </S.menuLayout>
  );
};

export default TodoMenu;
