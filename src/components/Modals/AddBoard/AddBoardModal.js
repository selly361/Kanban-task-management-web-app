import { Controller, useFieldArray, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CrossIcon } from "../../../assets";
import ModalWrapper from "../ModalWrapper";
import { addBoard } from "../../../features/boardTabsSlice";
import { closeModal } from "../../../features/modalSlice";
import styled from "styled-components";
import { toggleActiveBoard } from "../../../features/dataSlice";

export const StyledLabel = styled.label`
  color: ${({ theme }) => theme.grey};
`;

export const StyledInput = styled.input`
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.8125rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(130, 143, 163, 0.4);
  width: 95%;
  &.error {
    border-color: ${({ theme }) => theme.textFieldError};
  }
`;

const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
  flex-flow: column;
  width: 100%;
  height: max-content;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.textPrimary};
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  svg {
    cursor: pointer;
    transform: scale(0.8);
  }
`;

export const SubmitButton = styled.button`
  color: white;
  padding: 0.5rem 0;
  font-weight: bold;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.buttonPrimaryBg};
  transition: 1s ease;
  transition-property: color, background-color;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryHover};
  }
`;

export const CreateColumnButton = styled(SubmitButton)`
  background-color: ${({ theme }) => theme.buttonSecondaryBg};
  color: ${({ theme }) => theme.buttonSecondaryText};

  &:hover {
    background-color: ${({ theme }) => theme.buttonSecondaryHover};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;

    &:hover {
      background-color: ${({ theme }) => theme.buttonSecondaryBg};
    }
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.red};
  position: absolute;
  right: 3rem;
`;

export const modalAnimation = {
  hidden: {
    scale: 0
  },
  visible: {
    scale: 1,
    transition: { duration: .3 }
  },
  exit: {
    scale: 0,
    transition: { duration: .3 }
  },
};


export const hasDuplicates = (value, boardTabs) => {
  return !Boolean(
    boardTabs.find(
      (board) => board.name.toLowerCase() === value.toLowerCase()
    )
  );
};

export const hasDuplicatesColumn = (value, columns) => {
  let duplicatedColumns = columns.filter(
    (column) => column.name.toLowerCase() === value.toLowerCase()
  );

  let duplicated = duplicatedColumns.length === 1;

  return duplicated;
};


const AddBoardModal = () => {
  const dispatch = useDispatch();
  const boardTabs = useSelector((state) => state.boardTabs);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      columns: [{ name: "", tasks: [] }],
      name: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit = () => {
    dispatch(
      addBoard({
        name: getValues().name,
        columns: getValues().columns,
      })
    );

    dispatch(closeModal());
    dispatch(toggleActiveBoard(getValues().name));
  };



  

  return (
    <ModalWrapper>
      <Title>Add New Board</Title>
      <StyledForm>
        <StyledLabel>Name</StyledLabel>
        <InputContainer>
          <StyledInput
            className={errors.name && "error"}
            {...register("name", { required: true, validate: (value) => hasDuplicates(value, boardTabs) })}
          />
          {errors.name && (
            <ErrorMessage>
              {errors.name?.type === "required" ? "Required" : "Used"}
            </ErrorMessage>
          )}
        </InputContainer>
        <StyledLabel>Columns</StyledLabel>
        {fields.map((item, index, arr) => (
          <InputContainer key={item.id}>
            <StyledInput
              className={errors.columns?.[index]?.name && "error"}
              {...register(`columns.${index}.name`, {
                required: true,
                validate: (value) => hasDuplicatesColumn(value, getValues().columns),
              })}
            />
            {errors.columns?.[index]?.name.type == "required" && (
              <ErrorMessage>Required</ErrorMessage>
            )}
            {errors.columns?.[index]?.name.type == "validate" && (
              <ErrorMessage>Used</ErrorMessage>
            )}
            {arr.length !== 1 && <CrossIcon onClick={() => remove(index)} />}
          </InputContainer>
        ))}
        <CreateColumnButton
          disabled={getValues().columns.length >= 6 && true}
          type="button"
          onClick={() => append({ name: "", tasks: [] })}
        >
          +Add New Column
        </CreateColumnButton>
        <SubmitButton
          onClick={handleSubmit((e) => {
            try {
              onSubmit();
            } catch (e) {}
          })}
        >
          Create New Board
        </SubmitButton>
      </StyledForm>
    </ModalWrapper>
  );
};

export default AddBoardModal;
