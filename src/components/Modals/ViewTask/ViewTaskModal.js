import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CheckIcon, VerticalDotsIcon } from "../../../assets";
import { viewTask } from "../../../features/boardTabsSlice";
import { changeModalsDetail, openModal } from "../../../features/modalSlice";
import DropDown from "../../shared/DropDown/DropDown";
import EditDropDown from "../../shared/EditDropDown/EditDropDown";
import ModalWrapper from "../ModalWrapper";

const Title = styled.h4`
  color: ${({ theme }) => theme.textPrimary};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.grey};
  font-weight: 400;
  font-size: 0.9rem;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DropDownContainer = styled.div`
  width: 150px;
  position: relative;
  display: flex;
  justify-content: end;
`;

const TextLabel = styled.h5`
  color: ${({ theme }) => theme.textPrimary};
`;

const TaskContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bodyBg};
  display: flex;
  gap: 1rem;
  align-items: center;
  border-radius: 5px;
  transition: 1s background-color ease;
  cursor: pointer;


  &:hover {
    background-color: #20212C;
    background: rgba(99,95,199,.25);
  }
`;

const TaskTitle = styled.h6`
  color: ${({ theme }) => theme.textPrimary};

  &::before {
    content: "";
    transition: 1s right ease;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.grey};
  }

  &.completed {
    position: relative;
    color: ${({ theme }) => theme.grey};

    &::before {
      width: 100%;
    }
  }
`;

const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.navBarBg};
  display: grid;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.border};

  &.completed {
    background: ${({ theme }) => theme.subTaskCheckBoxHover};
  }
`;

const ViewTaskModal = () => {
  const { modal, boardTabs, data } = useSelector((state) => state);
  const { activeBoard } = data;
  const modalsDetail = modal.ModalsDetail
  const dispatch = useDispatch();
  const displayedBoard = boardTabs.find((board) => board.name === activeBoard);

  const column = displayedBoard?.columns.find(
    (column) => column.name === modalsDetail?.status
  );

  const selectedTask = column?.tasks.find((task) => task.title === modalsDetail?.title);


  const [open, setOpen] = useState(false);
  const [subTasks, setSubTasks] = useState(selectedTask?.subtasks)


  const [statusData, setStatusData] = useState(modalsDetail?.status);

  const onSetCurrentStatus = (value) => {
    setStatusData(value);
  };

  const handleEditModal = () => {
    dispatch(openModal({ activeBoard, ModalsType: "edit-task", ModalsDetail: { title: selectedTask.title, status: statusData } }))
  };

  const handleDeleteModal = () => {
    dispatch(openModal({ ModalsType: "delete-task", ModalsDetail: { title: selectedTask.title }  }))
    dispatch(changeModalsDetail({ status: statusData, title: modalsDetail?.title }));

  };


  const handleTaskClick = (index) => {
    
   let subTasksCopy = JSON.parse(JSON.stringify(subTasks));
   let task = subTasksCopy.find((subTask, i) => index == i)
   
   task.isCompleted = !task.isCompleted;

   setSubTasks(subTasksCopy)
  }

  useEffect(() => {
    const obj = {
      type: "status",
      taskTitle: modalsDetail?.title,
      activeBoard,
      oldTask: selectedTask,
      newTask: { ...selectedTask, status: statusData, subTasks },
    };



    dispatch(viewTask(obj));
    dispatch(changeModalsDetail({ status: statusData, title: modalsDetail?.title }));


  }, [statusData]);

  useEffect(() => {
    const obj = {
      taskTitle: modalsDetail?.title,
      activeBoard,
      oldTask: selectedTask,
      newTask: { ...selectedTask, status: statusData, subTasks },
    };



    dispatch(viewTask(obj));


  }, [JSON.stringify(subTasks)]);


  return (
    <ModalWrapper>
      <TaskHeader>
        <Title>{modalsDetail?.title}</Title>
        <DropDownContainer>
          <VerticalDotsIcon onClick={() => setOpen((e) => !e)} />
          {open && (
            <EditDropDown
              type="task"
              handleEditModal={handleEditModal}
              handleDeleteModal={handleDeleteModal}
            />
          )}
        </DropDownContainer>
      </TaskHeader>
      <Description>{selectedTask?.description || "No description"}</Description>
      <TextLabel>
        Subtasks ( {subTasks.filter((task) => task.isCompleted).length} of
        {" " + subTasks.length} )
      </TextLabel>
      {subTasks.map((subTask, index) => (
        <TaskContainer key={subTask.title + index} onClick={() => handleTaskClick(index)}>
          {
            <CheckBox
              className={subTask.isCompleted && "completed"}
            >
              {subTask.isCompleted && <CheckIcon />}
            </CheckBox>
          }
          <TaskTitle className={subTask.isCompleted && "completed"}>
            {subTask.title}
          </TaskTitle>
        </TaskContainer>
      ))}

      <DropDown
        defaultStatus={statusData}
        onSetCurrentStatus={onSetCurrentStatus}
        columns={displayedBoard?.columns}
      />
    </ModalWrapper>
  );
};

export default ViewTaskModal;
