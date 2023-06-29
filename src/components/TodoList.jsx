import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TodoListItem from './TodoListItem.jsx';
import ListPageNation from './ListPageNation.jsx';
const S = {
  layout: styled.div`
    width: 90%;
    height: 430px;
    border: 4px solid;
    margin: 0px 0px 10px 0px;
    position: relative;
  `,
  Footer: styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
  `,
};
const TodoList = ({
  todoData,
  setTodoData,
  handleClick,
  page,
  setPage,
  limit,
}) => {
  const handleEnd = (result) => {
    if (!result.destination) return;
    const newTodoData = [...todoData];
    // 1. 변경 하려는 아이템에 인덱스를 배열에서 제거
    // 2. return 값으로 지워진 아이템 잡기
    const [reorderItem] = newTodoData.splice(result.source.index, 1);
    // 3. 원하는 인덱스에 reoderItem을 배열에서 추가
    newTodoData.splice(result.destination.index, 0, reorderItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };
  const offset = (page - 1) * limit;
  return (
    <S.layout>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.slice(offset, offset + limit).map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                  ref={provided.innerRef}
                >
                  {(provided, snapshot) => (
                    <TodoListItem
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      date={data.date}
                      completed={data.completed}
                      importance={data.importance}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                      ref={provided.innerRef}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <S.Footer>
        {todoData.length === 0 ? null : (
          <ListPageNation
            todoData={todoData}
            total={todoData.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </S.Footer>
    </S.layout>
  );
};

export default TodoList;
