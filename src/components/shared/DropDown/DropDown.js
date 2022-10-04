import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowDownIcon } from "../../../assets";

const Container = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
`;

const StyledDropDownInput = styled.div`
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.8125rem;
  padding: 0.5rem;
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
        transform: rotate(180deg)
    }
}
`;

const Selector = styled.h5`
    color: ${({theme}) => theme.grey};
    cursor: pointer;
    &:hover {
    color: ${({theme}) => theme.textPrimary};

    }
`;

const StyledDropDown = styled.div`
  width: 100%;
  height: max-content;
  background-color: ${({ theme }) => theme.dropDownBg};
  padding: .5rem;
  display: flex;
  flex-flow: column;
  gap: .4rem;
  box-shadow: 0 0 8px #364e7e1a;

`;

const DropDown = ({ onSetCurrentStatus, columns, defaultStatus }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultStatus);

  

  return (
    <Container>
      <StyledDropDownInput className={open && "active"} onClick={() => setOpen((e) => !e)}>
        {selected}
        <ArrowDownIcon />
      </StyledDropDownInput>

      {open && (
        <StyledDropDown>
          {columns.map((column) => (
            <Selector
              key={column.name}
              onClick={() => {
                setOpen(false);
                setSelected(column.name)
                onSetCurrentStatus(column.name)
              }}
            >
              {column.name}
            </Selector>
          ))}
        </StyledDropDown>
      )}
    </Container>
  );
};

export default DropDown;
