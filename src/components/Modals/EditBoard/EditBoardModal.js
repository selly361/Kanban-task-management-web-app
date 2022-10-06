import {
  CreateColumnButton,
  ErrorMessage,
  StyledInput,
  StyledLabel,
  SubmitButton,
  Title,
  hasDuplicatesColumn,
} from "../AddBoard/AddBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";

import { CrossIcon } from "../../../assets";
import ModalWrapper from "../ModalWrapper";
import React from "react";
import { closeModal } from "../../../features/modalSlice";
import { editBoard } from "../../../features/boardTabsSlice";
import styled from "styled-components";
import { toggleActiveBoard } from "../../../features/dataSlice";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  svg {
    cursor: pointer;
    transform: scale(0.8);


    &.block {
      opacity: 0.4;
    }
  }

  
`;

const hasDuplicatesBoardEdit = (value, boardTabs, activeBoard) => {
  const isDuplicated =
    boardTabs.filter(
      (board) =>
        board.name.toLowerCase() === value.toLowerCase() &&
        board.name.toLowerCase() !== activeBoard.toLowerCase()
    ).length === 0;

  return isDuplicated;
};

const EditBoardModal = ({ type }) => {
  const { boardTabs, data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { activeBoard } = data;

  const boardToEdit = boardTabs.find((board) => board.name === activeBoard);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      columns: boardToEdit?.columns,
      name: boardToEdit?.name,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit = () => {
    const { name, columns } = getValues();
    dispatch(editBoard({ boardToEdit: { name, columns }, activeBoard }));
    dispatch(toggleActiveBoard(name));
    dispatch(closeModal());
  };

  return (
    <ModalWrapper>
      <Title>{!type ? "Edit Board" : "Add New Column"}</Title>
      <StyledLabel>Name</StyledLabel>
      <Wrapper>
        <StyledInput
          disabled={type}
          className={errors.name && "error"}
          {...register("name", {
            required: true,
            validate: (value) =>
              hasDuplicatesBoardEdit(value, boardTabs, activeBoard),
          })}
        />
        {errors.name && (
          <ErrorMessage>
            {errors.name?.type === "required" ? "Required" : "Used"}
          </ErrorMessage>
        )}
      </Wrapper>
      <StyledLabel>Columns</StyledLabel>
      {fields.map((item, index, arr) => (
        <Wrapper key={item.id}>
          <StyledInput
            className={errors.columns?.[index]?.name && "error"}
            {...register(`columns.${index}.name`, {
              required: true,
              validate: (value) =>
                hasDuplicatesColumn(value, getValues().columns),
            })}
          />
          {errors.columns?.[index]?.name.type == "required" && (
            <ErrorMessage>Required</ErrorMessage>
          )}
          {errors.columns?.[index]?.name.type == "validate" && (
            <ErrorMessage>Used</ErrorMessage>
          )}
          {type ? (
            index + 1 <= boardToEdit.columns.length ? (
              <CrossIcon className="block" />
            ) : (
              <CrossIcon onClick={() => remove(index)} />
            )
          ) : (
            arr.length !== 1 && <CrossIcon onClick={() => remove(index)} />
          )}
        </Wrapper>
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
        Save Changes
      </SubmitButton>
    </ModalWrapper>
  );
};

export default EditBoardModal;
