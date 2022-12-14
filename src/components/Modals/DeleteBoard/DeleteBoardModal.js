import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { closeModal } from "../../../features/modalSlice";
import { deleteBoard } from "../../../features/boardTabsSlice";
import { modalAnimation } from "../AddBoard/AddBoardModal";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledModal = styled(motion.div)`
  width: 500px;
  height: max-content;
  background-color: ${({ theme }) => theme.taskBg};
  position: absolute;
  inset: 0;
  margin: auto;
  z-index: 90;
  display: flex;
  padding: 2rem;
  align-items: start;
  flex-flow: column;
  justify-content: center;
  gap: 3rem;
  border-radius: 10px;

  @media (max-width: 703px){
      & {
        width: 95vw;
      }
    }
`;

const Title = styled.h3`
    color: ${({theme}) => theme.red};
    
`

const Info = styled.h5`
    color: ${({theme}) => theme.grey};
    


  span {
    
    color: ${({theme}) => theme.blue};
  }
`

const ButtonsContainer = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
`

const DeleteButton = styled.button`
    background-color: ${({theme}) => theme.deleteButtonBg};
    color: white;
    padding: 1rem 0;
    border-radius: 20px;
    font-weight: bold;
    
    &:hover {
    background-color: ${({theme}) => theme.deleteButtonHover};
      
    }
`

const CancelButton = styled(DeleteButton)`
  background-color: ${({theme}) => theme.buttonSecondaryBg};
  color: ${({theme}) => theme.blue};

  &:hover {
  background-color: ${({theme}) => theme.buttonSecondaryHover};
    
  }
`

const DeleteBoardModal = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(state => state.data.activeBoard);
  
  const handleDelete = () => {
    dispatch(deleteBoard(activeBoard))
    dispatch(closeModal())
  }

  const handleCancel = () => {
    dispatch(closeModal())
    
  }

  return (
    <StyledModal            
    variants={modalAnimation}
    initial="hidden"
    animate="visible"
    exit="exit">
        <Title>Delete this board?</Title>
        <Info>Are you sure you want to delete <span>{activeBoard}</span> board? This action will remove all columns and tasks and cannot be reversed.</Info>
        <ButtonsContainer>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonsContainer>
    </StyledModal>
  );
};

export default DeleteBoardModal;
