import { ArrowDownIcon, CheckIcon, PurpleCheckIcon } from "../../../assets";
import React, { useEffect, useState } from "react";

import checkUrl from "../../../assets/purple-check-icon.svg";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
`;

const StyledDropDownInput = styled.div`
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.8125rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(130, 143, 163, 0.4);
  resize: none;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.grey};

  svg {
    transition: 1s ease transform;
  }

  &.active {
    border: 1px solid ${({ theme }) => theme.dropDownActive};

    svg {
      transform: rotate(180deg);
    }
  }
`;

const Selector = styled.li`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  justify-content: space-between;
  transition: 1s ease;
  transition-property: background-color, color;
  padding-bottom: .6rem;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.blue};
  
  &:hover {
    color: ${({ theme }) => theme.grey};
  }

  &.selected {
    background: url(${checkUrl}) no-repeat;
    background-position: right;
    background-size: 20px;
  }
`;

const StyledDropDown = styled.div`
  background-color: ${({ theme }) => theme.dropDownBg};
  padding: 1rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  box-shadow: 0 0 8px #364e7e1a;
  position: fixed;
  width: 40%;
  height: max-content;
  inset: 0;
  margin: auto;
  z-index: 200;
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 150;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DropDown = ({ onSetCurrentStatus, columns, defaultStatus }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultStatus);

  return (
    <Container>
      <StyledDropDownInput
        className={open && "active"}
        onClick={() => setOpen((e) => !e)}
      >
        <h4>{selected}</h4>
        <ArrowDownIcon />
      </StyledDropDownInput>

      {open && (
        <Overlay onClick={() => setOpen(false)}>
          <StyledDropDown>
            {columns.map((column) => (
              <Selector
                className={column.name === selected && "selected"}
                key={column.name}
                onClick={() => {
                  setOpen(false);
                  setSelected(column.name);
                  onSetCurrentStatus(column.name);
                }}
              >
                {column.name}
              </Selector>
            ))}
          </StyledDropDown>
        </Overlay>
      )}
    </Container>
  );
};

export default DropDown;
