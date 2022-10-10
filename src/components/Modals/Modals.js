import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import { closeModal, openModal } from "../../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import AddBoardModal from "./AddBoard/AddBoardModal";
import AddColumnModal from "./AddColumn/AddColumnModal";
import AddTaskModal from "./AddTask/AddTaskModal";
import DeleteBoardModal from "./DeleteBoard/DeleteBoardModal";
import DeleteTaskModal from "./DeleteTask/DeleteTaskModal";
import EditBoardModal from "./EditBoard/EditBoardModal";
import EditTaskModal from "./EditTask/EditTaskModal";
import ViewTaskModal from "./ViewTask/ViewTaskModal";
import styled from "styled-components";

const StyledOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: black;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;

  @media (min-width: 1000px) {
    &.side-bar {
      display: none;
    }
  }
`;

const Overlay = ({ onClick, className }) => {
  return (
    <StyledOverlay
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      onClick={onClick}
    />
  );
};

const Modals = () => {
  const { ModalsType, ModalsOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ModalsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [ModalsOpen, ModalsType]);

  const handleOverlayClick = () => {
    dispatch(closeModal());
  };



  return (
    <Fragment>
      <AnimatePresence>
        {ModalsType === "add-board" && <AddBoardModal />}
        {ModalsType === "delete-board" && <DeleteBoardModal />}
        {ModalsType === "edit-board" && <EditBoardModal />}
        {ModalsType === "add-task" && <AddTaskModal />}
        {ModalsType === "view-task" && <ViewTaskModal />}
        {ModalsType === "delete-task" && <DeleteTaskModal />}
        {ModalsType === "edit-task" && <EditTaskModal />}
        {ModalsType === "new-column" && <EditBoardModal type="new-column" />}
      </AnimatePresence>
      <AnimatePresence>
        {(ModalsOpen && ModalsType !== "sidebar-modal") && <Overlay onClick={handleOverlayClick} />}
      </AnimatePresence>

      <AnimatePresence>
        {ModalsOpen && ModalsType === "sidebar-modal" && (
          <Overlay className="side-bar" onClick={handleOverlayClick} />
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Modals;
