import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { openModal } from "../../features/modalSlice";
import styled from "styled-components";

const StyledNewColumn = styled.div`
  width: 270px;
  display: grid;
  place-items: center;
  font-size: 2rem;
  background: ${({ theme }) => theme.NewColumn};
  height: 500px;
  align-self: flex-start;
  border-radius: 10px;
  color: ${({ theme }) => theme.grey};
  font-weight: bold;
  cursor: pointer;
  transition: 1s color;
  margin-top: 2.4rem;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const NewColumn = ({ hide }) => {
  const dispatch = useDispatch();
  const { boardTabs, data } = useSelector((state) => state);

  let currentBoard = boardTabs.find((board) => board.name === data.activeBoard);
  return (
    currentBoard?.columns.length < 6 && <StyledNewColumn onClick={() => dispatch(openModal({ ModalsType: "new-column" }))}>+New Column</StyledNewColumn>
  );
};

export default NewColumn;
