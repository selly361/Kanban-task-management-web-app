import BoardColumn from "../BoardColumn/BoardColumn";
import NewColumn from "../BoardColumn/NewColumn";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledBoardBody = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.bodyBg};
  top: 120px;
  min-height: calc(100vh - 100px);
  left: 300px;
  padding-left: 20px;
  overflow: scroll;
  transition: 1s left ease;
  display: flex;
  gap: 3rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
  &.close {
    padding-left: 2rem;
    left: 0;
  }
`;
const BoardBody = () => {
  const state = useSelector((state) => state);
  const { sideBarsOpen, activeBoard } = state.data;
  const boardTabs = state.boardTabs

  const BoardToDisplay = boardTabs.find(board => board.name === activeBoard)

  console.log(BoardToDisplay.columns)
  return (
    <StyledBoardBody className={sideBarsOpen}>
        {BoardToDisplay?.columns.map((boardColumn, index) => <BoardColumn key={boardColumn.name} index={index} {...boardColumn} />)}
         <NewColumn />
    </StyledBoardBody>
  )
};

export default BoardBody;
