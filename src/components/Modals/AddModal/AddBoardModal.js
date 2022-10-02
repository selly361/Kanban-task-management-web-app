import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  width: 400px;
  height: 300px;
  background-color: ${({ theme }) => theme.bodyBg};
  position: absolute;
  inset: 0;
  margin: auto;
  z-index: 90;
  display: flex;
  padding: 2rem;
  align-items: start;
  flex-flow: column;
  justify-content: center;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.grey};
`;

const StyledInput = styled.input``;

const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
  flex-flow: column;
  width: 90%;
`;

const Title = styled.h2`
`

const AddBoardModal = () => {
  return (
    <StyledModal>
      <Title>Add New Board</Title>
      <StyledForm>
        <StyledLabel>Name</StyledLabel>
        <StyledInput />
        <StyledLabel>Columns</StyledLabel>

        <button>+Add New Column</button>
        <button>Create New Board</button>
      </StyledForm>
    </StyledModal>
  );
};

export default AddBoardModal;
