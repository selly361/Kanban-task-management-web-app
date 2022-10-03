import { MoonIcon, SunIcon } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import styled from "styled-components";
import { toggleTheme } from "../../../features/dataSlice";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bodyBg};
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  
`;

const ToggleBody = styled.div`
  width: 40px;
  box-sizing: content-box;
  height: 15px;
  background-color: ${({ theme }) => theme.blue};
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0.1rem 0.3rem;
  cursor: pointer;
`;
const Circle = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: white;
  transition: .3s margin ease;

  &.dark {
    margin-right: 30px;
  }

  &.light {
    margin-left: 30px;
  }
`;

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.data.theme);
  const dispatch = useDispatch();

  return (
    <Container>
      <MoonIcon />
      <ToggleBody onClick={() => dispatch(toggleTheme())}>
        <Circle className={theme} />
      </ToggleBody>
      <SunIcon />
    </Container>
  );
};

export default ThemeSwitcher;
