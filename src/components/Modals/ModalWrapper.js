import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledModal = styled(motion.div)`
  width: 600px;
  height: max-content;
  background-color: ${({ theme }) => theme.taskBg};
  position: fixed;
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
  overflow-y: scroll;
`;

export const modalAnimation = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.3 },
  },
};

const ModalWrapper = ({ children }) => {
  return (
    <StyledModal
      variants={modalAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </StyledModal>
  );
};

export default ModalWrapper;
