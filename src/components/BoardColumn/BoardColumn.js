import React from "react";
import Task from "../Task/Task";
import styled from "styled-components";

const StyledColumn = styled.div`
  width: 270px;
  height: max-content;
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

const ColumnName = styled.h4`
  color: ${({ theme }) => theme.grey};
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-weight: 500;
`;

const CircleStatus = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  min-height: 500px;
  border-radius: 10px;
  
  &.empty {
    border: 2px dashed ${({ theme }) => theme.border};
  }
`;

const BoardColumn = ({ name, tasks, index }) => {
  return (
    <StyledColumn>
      <ColumnName>
        <CircleStatus className={`column-${index + 1}`} />
        {name}
        ({tasks.length})
      </ColumnName>
      <TasksContainer className={tasks.length === 0 && "empty"}>
        {tasks.map((task, index) => (
          <Task key={task.title + index} {...task} />
        ))}
      </TasksContainer>
    </StyledColumn>
  );
};

export default BoardColumn;
