import React, { useEffect, useState } from "react";
import { addBoard, deleteBoard } from "../../features/boardTabsSlice";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../shared/Logo/Logo";
import { VerticalDotsIcon } from "../../assets";
import { openModal } from "../../features/modalSlice";
import styled from "styled-components";
import { toggleActiveBoard } from "../../features/dataSlice";

const StyledNavbar = styled.aside`
  position: fixed;
  width: 100vw;
  height: 97px;
  left: 0px;
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
`;

const DropDown = styled.div`
  position: absolute;
  top: 90%;
  background-color: ${({theme}) => theme.bodyBg};
  left: 0;
  right: 0;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  align-items: start;
  padding: 1rem;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.textPrimary};
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
  padding: .9rem 1.3rem;
  background-color: ${({theme}) => theme.buttonPrimaryBg};
  color: white;
  font-weight: bold;

  &:hover {
  background-color: ${({theme}) => theme.buttonPrimaryHover};
    
  }
  
`
const EditBoardButton = styled.button`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({theme}) => theme.grey};
  background-color: transparent;
  &:hover {
    opacity: 0.7;
  }
`

const DeleteBoardButton = styled(EditBoardButton)`
    color: ${({theme}) => theme.red};
`

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const state = useSelector((state) => state);
  const { data, boardTabs } = state;
  const dispatch = useDispatch();
  const { activeBoard } = data;

  useEffect(() => {
    if (boardTabs.length === 0) {
      dispatch(toggleActiveBoard("No Boards Found"));
    } 

    let boardThatsActive = boardTabs.find(board => board.name === activeBoard)

    if(!boardThatsActive && boardTabs.length){
      dispatch(toggleActiveBoard(boardTabs.at(-1).name));
      
    }
  }, [boardTabs.length]);


  const handleDeleteModal = () => {
    dispatch(openModal({ ModalsType: "delete-board" }))
    setOpen(false)
  }


  return (
    <StyledNavbar>
      <Logo />
      <Title>{activeBoard}</Title>
      {boardTabs.length !== 0 && (
        <ButtonsContainer>
          <AddTaskButton>+Add New Task</AddTaskButton>
          <VerticalDotsIcon onClick={() => setOpen(e => !e)} />
          {open && <DropDown>
            <EditBoardButton>Edit Board</EditBoardButton>
            <DeleteBoardButton onClick={handleDeleteModal}>Delete Board</DeleteBoardButton>
          </DropDown>}
        </ButtonsContainer>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
