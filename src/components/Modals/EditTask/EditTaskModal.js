import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CrossIcon } from "../../../assets";
import { editTask } from "../../../features/boardTabsSlice";
import { closeModal } from "../../../features/modalSlice";
import DropDown from "../../shared/DropDown/DropDown";
import {
  ErrorMessage,
  StyledInput,
  SubmitButton,
  Title,
} from "../AddBoard/AddBoardModal";
import ModalWrapper from "../ModalWrapper";

export const Wrapper = styled.div`
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

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.8rem;
  font-weight: bold;
`;

const DescInput = styled.textarea`
  height: 100px;
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.8125rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(130, 143, 163, 0.4);
  width: 95%;
  resize: none;
  outline: none;

  &.error {
    border-color: ${({ theme }) => theme.textFieldError};
  }
`;

const AddSubtaskButton = styled.button`
  background-color: ${({ theme }) => theme.buttonSecondaryBg};
  color: ${({ theme }) => theme.buttonSecondaryText};
  padding: 0.7rem 0;
  font-weight: bold;
  border-radius: 3rem;
  width: 95%;
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

const duplicatedTitle = (value, columns, activeBoard) => {};

const duplicatedSubtasks = (value, activeBoard, boards, status) => {
  let columns = boards.find(board => board.name === activeBoard).columns

  let column = columns.find(column => column.name === status)

  // checks if theres a task that has the same name as the value, if it does it means its taken
  let taskTitleTaken = column.tasks.filter(task => task.title.toLowerCase() === value.toLowerCase()).length > 1

  // return false if its taken because it isnt valid
  if(taskTitleTaken ){
    return false
  }

  // return true if taken because its valid

  return true
  

  

}

const EditTaskModal = () => {
    const dispatch = useDispatch();

    const { data, modal, boardTabs } = useSelector(state => state);
    const { activeBoard } = data;
  
  
    const { title, status } = modal.ModalsDetail;
  
    let currentBoard = boardTabs.find((board) => board.name === activeBoard);
  
  let column = currentBoard.columns.find(column => column.name === status)
  let task = column?.tasks.find(task => task.title === title)

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title,
      description: task?.description,
      status,
      subtasks: task?.subtasks,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSetCurrentStatus = (value) => {
    setValue("status", value);
  };

  const onSubmit = () => {
    const newTask = getValues()
    dispatch(editTask({ newTask, activeBoard, oldStatus: status }))
    dispatch(closeModal())
  }

  return (
    <ModalWrapper>
      <Title>Add New Task</Title>
      <StyledLabel>Title</StyledLabel>
      <Wrapper>
        <StyledInput
          className={errors.title && "error"}
          {...register("title", {
            required: true,
            validate: (value) => duplicatedSubtasks(value, activeBoard, boardTabs, getValues().status)

          })}
        />
        {errors.title && (
          <ErrorMessage>
            {errors.title?.type === "required" && "Required"}
            {errors.title?.type === "validate" && "Used"}
          </ErrorMessage>
        )}
      </Wrapper>
      <StyledLabel>Description</StyledLabel>
      <Wrapper>
        <DescInput
          className={errors.description && "error"}
          {...register("description", {
          })}
        />
      </Wrapper>
      <StyledLabel>Subtasks</StyledLabel>
      {fields.map((item, index, arr) => (
        <Wrapper key={item.id}>
          <StyledInput
            className={errors.subtasks?.[index]?.title && "error"}
            {...register(`subtasks.${index}.title`, {
              required: true,
            })}
          />
          {errors.subtasks?.[index]?.title.type == "required" && (
            <ErrorMessage>Required</ErrorMessage>
          )}
          <CrossIcon onClick={() => remove(index)} />
        </Wrapper>
      ))}
      <AddSubtaskButton
        onClick={() =>
          append({ title: "", isCompleted: false })
        }
      >
        +Add New Subtask
      </AddSubtaskButton>
      <StyledLabel>Status</StyledLabel>
      <DropDown
        onSetCurrentStatus={onSetCurrentStatus}
        defaultStatus={getValues().status}
        columns={currentBoard.columns}
      />
      <SubmitButton
        onClick={handleSubmit((e) => {
          try {
            onSubmit();
          } catch (e) {}
        })}
      >
        Save changes
      </SubmitButton>
    </ModalWrapper>
  );
};

export default EditTaskModal;
