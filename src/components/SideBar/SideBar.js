import { AnimatePresence, motion } from "framer-motion";
import { BoardIcon, HideIcon, ShowIcon } from "../../assets";
import React, { Fragment } from "react";
import { toggleActiveBoard, toggleSidebar } from "../../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../shared/Logo/Logo";
import ThemeSwitcher from "../shared/ThemeSwitcher/ThemeSwitcher";
import styled from "styled-components";

const StyledSideBar = styled(motion.aside)`
  position: absolute;
  width: 300px;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-color: ${({ theme }) => theme.asideBg};
  border-right: 1px solid ${({ theme }) => theme.border};
  z-index: 5;
  padding-top: 120px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding-bottom: 3rem;
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
  font-size: 1rem;
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

const ShowButton = styled(motion.button)`
  position: absolute;
  left: 0;
  bottom: 3rem;
  background-color: ${({ theme }) => theme.blue};
  padding: 1.1rem 1.4rem;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  transition: 0.5s background-color ease;

  &:hover {
    background-color: ${({ theme }) => theme.lightBlue};
  }
`;

const animation = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: { type: "spring", duration: 1, bounce: 0.05 },
  },
  exit: {
    x: "-100vw",
    transition: { duration: 1 },
  },
};

const SideBar = () => {
  const { boardTabs, data } = useSelector((state) => state);
  const { sideBarsOpen } = data;
  const dispatch = useDispatch();

  return (
    <Fragment>
      <AnimatePresence>
        {sideBarsOpen === "open" && (
          <StyledSideBar
            variants={animation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Logo />
            <div>
              <BoardTabsLength>ALL BOARDS ({boardTabs.length})</BoardTabsLength>
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
                <CreateBoardButton>
                  <BoardIcon />
                  +Create New Board
                </CreateBoardButton>
              </BoardsWrapper>
            </div>
            <Container>
              <ThemeSwitcher />
              <HideButton onClick={() => dispatch(toggleSidebar())}>
                <HideIcon />
                Hide Sidebar
              </HideButton>
            </Container>
          </StyledSideBar>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sideBarsOpen === "close" && (
          <ShowButton
            variants={animation}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => dispatch(toggleSidebar())}
          >
            <ShowIcon />
          </ShowButton>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default SideBar;