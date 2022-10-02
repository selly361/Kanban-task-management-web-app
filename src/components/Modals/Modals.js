import React, { Fragment, useEffect } from "react";
import { closeModal, openModal } from "../../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import AddBoardModal from "./AddModal/AddBoardModal";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: black;
  opacity: 0.6;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
`;

const Overlay = ({ onClick }) => {
  return <StyledOverlay onClick={onClick} />;
};

const Modals = () => {
  const { ModalsType, ModalsOpen, ModalsDetail } = useSelector(
    (state) => state.modal
  );

  const dispatch = useDispatch()

 useEffect(() => {
    document.documentElement.style.overflow = "hidden"
 }, [ModalsOpen])

 const handleOverlayClick = () => {
    dispatch(closeModal())
 }

  return (
    <Fragment>
      {ModalsType === "add-board" ? <AddBoardModal /> : null}
    
      {ModalsOpen && <Overlay onClick={handleOverlayClick} />}
    </Fragment>
  );
};

export default Modals;
