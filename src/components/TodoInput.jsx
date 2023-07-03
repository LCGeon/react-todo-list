import React from 'react';
import styled from 'styled-components';
import '../App.css';

const S = {
  box: styled.div`
    display: flex;
    justify-content: center;
    border-radius: 3px;
    border: 3px solid rgb(86, 36, 252);
    width: 100%;
    font-family: 'MaplestoryOTFBold';
  `,
  input: styled.input`
    width: 100%;
    height: 50px;
    font-size: 24px;
    padding: 0px 0px 0px 7px;
    border: none;

    &::placeholder {
      font-size: 15px;
    }
  `,
  btn: styled.button`
    width: 60px;
    background-color: white;
    border: none;
    font-size: 25px;
    padding: 0px 10px 10px 0px;
    cursor: pointer;
  `,
};

const TodoInput = ({
  value,
  setValue,
  handleSubmit,
  importance,
  setImportance,
}) => {
  const selectNum = [1, 2, 3, 4];
  const selectIcons = ['🔵', '🟢', '🟡', '🔥'];

  const phrase = [
    '늦게 해도 돼요',
    '천천히 할게요',
    '신경 써야 돼요',
    '❗ 매우 중요해요 ❗',
  ];
  return (
    <form onSubmit={handleSubmit} style={{ width: '90%' }}>
      <S.box>
        <select
          style={{
            fontSize: '15px',
            fontWeight: 'bold',
            border: 'none',
          }}
          onChange={(e) => setImportance(e.target.value)}
          value={importance}
        >
          {selectNum.map((item, index) => (
            <option value={item} key={item}>
              {selectIcons[index]}
              <span> {phrase[index]}</span>
            </option>
          ))}
        </select>
        <S.input
          type='text'
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder='할 일을 입력해주세요 !'
        />
        <S.btn type='submit'>✍🏻</S.btn>
      </S.box>
    </form>
  );
};

export default TodoInput;
