import { ArrowDownIcon, MobileLogoIcon, VerticalDotsIcon } from "../../assets";
import React, { useEffect, useState } from "react";
import { addBoard, deleteBoard } from "../../features/boardTabsSlice";
import { toggleActiveBoard, toggleSidebar } from "../../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";

import EditDropDown from "../shared/EditDropDown/EditDropDown";
import Logo from "../shared/Logo/Logo";
import { openModal } from "../../features/modalSlice";
import styled from "styled-components";

const StyledNavbar = styled.aside`
  position: fixed;
  width: 100vw;
  height: 97px;
  left: 0px;
  right: 0;
  top: 0px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.asideBg};
  padding-left: 320px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 100px;
  z-index: 6;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 1000px){
    padding-left: 10px;
}
`;

const MobileLogo = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: block;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textPrimary};

 @media (max-width: 1000px){
  & {
    font-size: 1rem;
  }
  &.remove {
    display: none; 
  }
 }
`;

const ButtonsContainer = styled.div`
  position: relative;
  width: max-content;
  gap: 2rem;
  display: flex;
  align-items: center;
  height: 100%;
`;

const AddTaskButton = styled.button`
  border-radius: 20px;
  padding: 0.9rem 1.3rem;
  background-color: ${({ theme }) => theme.buttonPrimaryBg};
  color: white;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryHover};
  }

  &:disabled:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryBg};
  }


  @media (max-width: 600px){
    & {
      font-size: .8rem;
      padding: 0.5rem 0.9rem;
    }
  }
`;

const Wrapper = styled.div`
  display: none;


  @media (max-width: 1000px){
    display: flex;
    gap: 1rem;
  align-items: center;

  svg {
   
  }
  }
`

const OpenSideBarModal = styled.button`
  display: flex;
  gap: 1rem;
  background-color: transparent;
  align-items: center;
`

const Arrow = styled(ArrowDownIcon)`
  transform: scale(1.5);
  transition: 1s ease transform;

  &.active {
    transform: scale(1.5) rotate(180deg);
  }
`

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const { data, boardTabs, modal } = state;
  const dispatch = useDispatch();
  const { activeBoard } = data;

  useEffect(() => {
    if (boardTabs.length === 0) {
      dispatch(toggleActiveBoard("No Boards Found"));
    }

    let boardThatsActive = boardTabs.find(
      (board) => board.name === activeBoard
    );

    if (!boardThatsActive && boardTabs.length) {
      dispatch(toggleActiveBoard(boardTabs.at(-1).name));
    }
  }, [boardTabs.length]);

  const handleDeleteModal = () => {
    dispatch(openModal({ ModalsType: "delete-board" }));
    setOpen(false);
  };

  const handleEditModal = () => {
    dispatch(openModal({ ModalsType: "edit-board" }));
    setOpen(false);
  };


  let isMob = window.matchMedia('(max-width: 1000px)').matches

  let active = modal?.ModalsType === "sidebar-modal"
  return (
    <StyledNavbar>
      <Logo />
      <Title className="remove">{activeBoard}</Title>
      <Wrapper>
        <MobileLogo>
          <MobileLogoIcon />
        </MobileLogo>
        <OpenSideBarModal onClick={() => {
          dispatch(openModal({ ModalsType: "sidebar-modal" }))
        }}>
        <Title>{activeBoard}</Title>
        <Arrow className={active && "active"} />
        
        </OpenSideBarModal>
      </Wrapper>
      <ButtonsContainer>
        <AddTaskButton
          onClick={() => {
            boardTabs.length === 0
              ? dispatch(openModal({ ModalsType: "add-board" }))
              : dispatch(openModal({ ModalsType: "add-task" }));
          }}
        >
          {boardTabs.length === 0 ? "+New Board" : "+New Task"}
        </AddTaskButton>
        {boardTabs.length !== 0 && (
          <VerticalDotsIcon onClick={() => setOpen((e) => !e)} />
        )}
        {open && (
          <EditDropDown
            handleEditModal={handleEditModal}
            handleDeleteModal={handleDeleteModal}
          />
        )}
      </ButtonsContainer>
    </StyledNavbar>
  );
};

export default Navbar;
