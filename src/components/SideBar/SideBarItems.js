import React from 'react'

import { BoardIcon, HideIcon, ShowIcon } from "../../assets";
import { toggleActiveBoard, toggleSidebar } from "../../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../features/modalSlice";
import styled from "styled-components";
import ThemeSwitcher from '../shared/ThemeSwitcher/ThemeSwitcher';



const SideBarContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding-bottom: 3rem;
  border-right: 1px solid ${({ theme }) => theme.border};
  height: calc(100vh - 97px);
  padding-top: 23px;
  height: 100%;
`;

const BoardTabsLength = styled.h6`
  color: ${({ theme }) => theme.grey};
  letter-spacing: 0.2rem;
  padding-left: 2rem;
`;

const BoardTab = styled.button`
  transition: 0.3s ease;
  transition-property: color, background-color;

  background-color: transparent;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.grey};
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  font-weight: bold;
  padding: 0.8rem 0 0.8rem 2rem;
  width: 90%;
  display: flex;
  gap: 1rem;
  align-items: center;

  &.active {
    background-color: ${({ theme }) => theme.blue};
    color: white;
  }

  &.not-active:hover {
    background-color: ${({ theme }) => theme.lightBlue};
    color: white;
  }
`;

const BoardsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-flow: column;
  gap: 0.2rem;
`;

 const CreateBoardButton = styled(BoardTab)`
  color: ${({ theme }) => theme.blue};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.5;
  }
  svg {
    stroke: ${({ theme }) => theme.blue};
  }
`;

const Container = styled.div`
  display: flex;
  padding: 1rem;
  padding-left: 2rem;
  flex-flow: column;
  gap: 1rem;
`;

const HideButton = styled.button`
  background-color: transparent;
  display: flex;
  gap: 1rem;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ theme }) => theme.grey};
  align-items: center;
  transition: 0.5s opacity ease;

  &:hover {
    opacity: 0.6;
  }
`;



const SideBarItems = () => {
    const { boardTabs, data } = useSelector((state) => state);
    const { sideBarsOpen } = data;
    const dispatch = useDispatch();
    
  return (
    <SideBarContainer>
    <div>
      <BoardTabsLength>
        ALL BOARDS ({boardTabs.length})
      </BoardTabsLength>
      <BoardsWrapper>
        {boardTabs.map(({ name }) => (
          <BoardTab
            key={name}
            onClick={() => dispatch(toggleActiveBoard(name))}
            className={
              data.activeBoard === name ? "active" : "not-active"
            }
          >
            <BoardIcon />
            {name}
          </BoardTab>
        ))}
        {boardTabs.length >= 8 ? null : (
          <CreateBoardButton
            onClick={() =>
              dispatch(openModal({ ModalsType: "add-board" }))
            }
          >
            <BoardIcon />
            +Create New Board
          </CreateBoardButton>
        )}
      </BoardsWrapper>
    </div>
    <Container>
      <ThemeSwitcher />
      <HideButton onClick={() => dispatch(toggleSidebar())}>
        <HideIcon />
        Hide Sidebar
      </HideButton>
    </Container>
  </SideBarContainer>
  )
}

export default SideBarItems