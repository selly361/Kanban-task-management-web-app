import React from "react";
import styled from "styled-components";

const DropDown = styled.div`
  position: absolute;
  top: 90%;
  background-color: ${({ theme }) => theme.editDropDown};
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
`;



const EditBoardButton = styled.button`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.grey};
  background-color: transparent;
  &:hover {
    opacity: 0.7;
  }
`;

const DeleteBoardButton = styled(EditBoardButton)`
  color: ${({ theme }) => theme.red};
`;


function EditDropDown({ handleEditModal, handleDeleteModal, type }) {
  let text = type === "task" ? "Task" : "Board"
  return (
    <DropDown>
      <EditBoardButton onClick={handleEditModal}>Edit {text}</EditBoardButton>
      <DeleteBoardButton onClick={handleDeleteModal}>
        Delete {text}
      </DeleteBoardButton>
    </DropDown>
  );
}

export default EditDropDown;
