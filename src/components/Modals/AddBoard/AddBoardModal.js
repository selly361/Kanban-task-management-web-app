import { Controller, useFieldArray, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CrossIcon } from "../../../assets";
import { addBoard } from "../../../features/boardTabsSlice";
import { closeModal } from "../../../features/modalSlice";
import { motion } from "framer-motion";
import styled from "styled-components";
import { toggleActiveBoard } from "../../../features/dataSlice";

const StyledModal = styled(motion.div)`
  width: 550px;
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
  gap: 1rem;
  border-radius: 10px;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.grey};
`;

const StyledInput = styled.input`
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

const Title = styled.h2`
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

const SubmitButton = styled.button`
  color: white;
  padding: 0.7rem 0;
  font-weight: bold;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.buttonPrimaryBg};
  transition: 1s ease;
  transition-property: color, background-color;
  width: 95%;
  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryHover};
  }
`;

const CreateColumnButton = styled(SubmitButton)`
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

const ErrorMessage = styled.span`
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

const AddBoardModal = () => {
  const dispatch = useDispatch();
  const boardTabs = useSelector((state) => state.boardTabs);
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
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

  const hasDuplicates = (value) => {
    return !Boolean(
      boardTabs.find(
        (board) => board.name.toLowerCase() === value.toLowerCase()
      )
    );
  };

  const hasDuplicatesColumn = (value) => {
    const { columns } = getValues();

    let duplicatedColumns = columns.filter(
      (column) => column.name.toLowerCase() === value.toLowerCase()
    );

    let duplicated = duplicatedColumns.length === 1;
    console.log(duplicated);

    return duplicated;
  };

  useEffect(() => {}, [getValues().columns]);

  return (
    <StyledModal            
    variants={modalAnimation}
    initial="hidden"
    animate="visible"
    exit="exit">
      <Title>Add New Board</Title>
      <StyledForm>
        <StyledLabel>Name</StyledLabel>
        <InputContainer>
          <StyledInput
            className={errors.name && "error"}
            {...register("name", { required: true, validate: hasDuplicates })}
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
                validate: hasDuplicatesColumn,
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
    </StyledModal>
  );
};

export default AddBoardModal;
