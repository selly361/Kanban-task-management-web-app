import React, { useEffect, useState } from "react";
import { addBoard, deleteBoard } from "../../features/boardTabsSlice";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../shared/Logo/Logo";
import styled from "styled-components";
import { toggleActiveBoard } from "../../features/dataSlice";

const StyledNavbar = styled.aside`
  position: fixed;
  width: 100vw;
  height: 97px;
  left: 0px;
  top: 0px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.asideBg};
  padding-left: 320px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 100px;
  z-index: 6;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textPrimary};
`;

const ButtonsContainer = styled.div``;

const Navbar = () => {
  const state = useSelector((state) => state);
  const { data, boardTabs } = state;
  const dispatch = useDispatch();
  const { activeBoard } = data;

  useEffect(() => {
    if (!boardTabs.length) {
      dispatch(toggleActiveBoard("No Boards Found"));
    }
  }, [boardTabs.length]);

  return (
    <StyledNavbar>
      <Logo />
      <Title>{activeBoard}</Title>
      {boardTabs.length ? (
        <ButtonsContainer>
        </ButtonsContainer>
      ) : null}
    </StyledNavbar>
  );
};

export default Navbar;
