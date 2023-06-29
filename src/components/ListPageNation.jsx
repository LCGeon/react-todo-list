import React from 'react';
import styled from 'styled-components';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

const S = {
  Nav: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
  `,
  Button: styled.button`
    border: none;
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    background: #729fff;
    color: white;
    font-size: 16px;

    &:hover {
      background: #3290fb;
      cursor: pointer;
      transform: translateY(-2px);
    }

    &[disabled] {
      background: grey;
      cursor: revert;
      transform: revert;
    }

    &[aria-current] {
      background: #a061ff;
      font-weight: bold;
      cursor: revert;
      transform: revert;
    }
  `,
};
const ListPageNation = ({ total, page, setPage, limit, todoData }) => {
  const numPages = Math.ceil(total / limit);

  return (
    <S.Nav>
      <S.Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        <AiOutlineLeft />
      </S.Button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <S.Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : null}
          >
            {i + 1}
          </S.Button>
        ))}
      <S.Button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages || !numPages}
      >
        <AiOutlineRight />
      </S.Button>
    </S.Nav>
  );
};

export default ListPageNation;
