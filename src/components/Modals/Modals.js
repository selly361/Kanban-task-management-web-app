import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import { closeModal, openModal } from "../../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import AddBoardModal from "./AddBoard/AddBoardModal";
import DeleteBoardModal from "./DeleteBoard/DeleteBoardModal";
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
`;

const Overlay = ({ onClick }) => {
  return <StyledOverlay initial={{ opacity: 0 }} animate={{ opacity: 0.6, transition: { duration: 1 } }} exit={{ opacity: 0, transition: { duration: 1 }  }} onClick={onClick} />;
};

const Modals = () => {
  const { ModalsType, ModalsOpen, ModalsDetail } = useSelector(
    (state) => state.modal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (ModalsOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [ModalsOpen]);

  const handleOverlayClick = () => {
    dispatch(closeModal());
  };

  return (
    <Fragment>
      <AnimatePresence>
        {ModalsType === "add-board" && <AddBoardModal />}
        {ModalsType === "delete-board" && <DeleteBoardModal />}
        </AnimatePresence>
      <AnimatePresence>
        {ModalsOpen && <Overlay onClick={handleOverlayClick} />}
      </AnimatePresence>
    </Fragment>
  );
};

export default Modals;
