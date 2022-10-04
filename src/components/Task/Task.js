import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { openModal } from "../../features/modalSlice";

const StyledTask = styled.div`
  width: 280px;
  min-height: 88px;
  display: flex;
  background-color: ${({ theme }) => theme.taskBg};
  padding: 1rem;
  flex-flow: column;
  gap: 0.7rem;
  border-radius: 12px;
  transition: 1s opacity ease;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const SubTasksLength = styled.p`
  color: ${({ theme }) => theme.grey};
  font-weight: bold;
  font-size: 0.8rem;
`;
const TaskTitle = styled.h5`
  color: ${({ theme }) => theme.textPrimary};
`;

const Task = ({ subtasks, title, description, status }) => {
  let completed = subtasks?.filter((subTask) => subTask.isCompleted);

  const dispatch = useDispatch();

  const handleTaskClick = () => {
    dispatch(
      openModal({
        ModalsType: "view-task",
        ModalsDetail: { title, status },
      })
    );
  };

  return (
    <StyledTask onClick={handleTaskClick}>
      <TaskTitle>{title}</TaskTitle>
      <SubTasksLength>
        {completed.length} of {subtasks.length}
      </SubTasksLength>
    </StyledTask>
  );
};

export default Task;
