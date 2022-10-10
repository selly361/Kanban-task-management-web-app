import React from 'react'
import styled from 'styled-components'
import SideBarItems from '../../SideBar/SideBarItems'


const Container = styled.aside`
    width: 68vw;
    height: max-content;
    position: fixed;
    inset: 0;
    margin: auto;
    background-color: ${({theme}) => theme.navBarBg};
    display: none;
    z-index: 900;
    border-radius: 15px;
    
    @media (max-width: 1000px){
        display: block;
    }
`

const SideBarModal = () => {
  return (
    <Container>
        <SideBarItems />
    </Container>
  )
}

export default SideBarModal