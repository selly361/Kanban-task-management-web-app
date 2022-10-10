import { useDispatch, useSelector } from "react-redux";

import BoardColumn from "../BoardColumn/BoardColumn";
import { BoardIcon } from "../../assets";
import NewColumn from "../BoardColumn/NewColumn";
import React from "react";
import { openModal } from "../../features/modalSlice";
import styled from "styled-components";

const StyledBoardBody = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.bodyBg};
  top: 120px;
  max-height: calc(100vh - 100px);
  left: 300px;
  padding-left: 20px;
  overflow: scroll;
  transition: 1s left ease;
  display: flex;
  gap: 3rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
 width: calc(100vw - 300px);
  margin: auto;
  &.close {
    padding-left: 2rem;
    left: 0;
 width: 100vw;
  }

  &.no-boards {
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
  }

  @media (max-width: 1000px){
    & {
      max-width: 100vw;
      left: 0;
      margin: 0;
      right: 0;
    }
}
`;

const NewBoardText = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.textPrimary};
`;
const CreateBoardButton = styled.button`
  color: ${({ theme }) => theme.blue};
  transition: opacity 0.3s ease;
  font-size: 1.4rem;
  background-color: transparent;
  font-weight: bold;
  text-align: center;
  width: 100%;
  &:hover {
    opacity: 0.5;
  }
  svg {
    stroke: ${({ theme }) => theme.blue};
  }
`;

const Gap = styled.div`
  width: 300px;
  height: 800px;
`

const BoardBody = () => {
  const state = useSelector((state) => state);
  const { sideBarsOpen, activeBoard } = state.data;
  const boardTabs = state.boardTabs;
  const dispatch = useDispatch();
  const BoardToDisplay = boardTabs.find((board) => board.name === activeBoard);

  return (
    <StyledBoardBody
      className={sideBarsOpen + `  ${!BoardToDisplay && `no-boards`}`}
    >
      {!BoardToDisplay && (
        <div>
          <NewBoardText>There's no Boards Left</NewBoardText>
          <CreateBoardButton
            onClick={() => dispatch(openModal({ ModalsType: "add-board" }))}
          >
            +Create Board
          </CreateBoardButton>
        </div>
      )}
      {BoardToDisplay?.columns.map((boardColumn, index, arr) => (
        <BoardColumn key={boardColumn.name} maxLength={arr.length - 1} index={index} {...boardColumn} />
        
      ))}
      <NewColumn />
    </StyledBoardBody>
  );
};

export default BoardBody;
