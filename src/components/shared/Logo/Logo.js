import { DarkLogoIcon, LightLogoIcon } from "../../../assets";

import React from "react";
import { selectTheme } from "../../../features/dataSlice";
import styled from "styled-components";
import { useSelector } from "react-redux";

const LogoWrapper = styled.div`
  width: 300px;
  height: 97px;
  display: grid;
  align-items: center;
  padding-left: 2rem;
  position: absolute;
  left: 0;
  top: 0;
  border-right: 1px solid ${({theme}) => theme.border};
  z-index: 10;

  @media (max-width: 1000px){
    display: none;
  }

`;

const Logo = () => {
  const theme = useSelector(state => state.data.theme);

  return (
    <LogoWrapper>
      {theme === "dark" ? <LightLogoIcon /> : <DarkLogoIcon />}
    </LogoWrapper>
  );
};

export default Logo;
