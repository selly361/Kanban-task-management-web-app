import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledModal = styled(motion.div)`
  width: 600px;
  max-height: 90vh;
  height: max-content;
  background-color: ${({ theme }) => theme.taskBg};
  position: fixed;
  inset: 0;
  margin: auto;
  z-index: 90;
  display: flex;
  padding: 2rem 1rem;
  align-items: start;
  flex-flow: column;
  gap: 1.5rem;
  border-radius: 5px;
  overflow-y: auto;

  ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.bodyBg};
    }

    ::-webkit-scrollbar {
      background: ${({ theme }) => theme.scrollBg};
    }


    @media (max-width: 703px){
      & {
        width: 95vw;
      }
    }


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
