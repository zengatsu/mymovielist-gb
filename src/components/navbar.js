import React from 'react';
import styled from 'styled-components';
import {RiMovie2Fill, RiInformationFill} from 'react-icons/ri';

const StyledNavBar = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #282828;
    position: fixed;
`;

const NavButton = styled.button`
    border: 0;
    width: 40px;
    padding: 0px;
    font-size: 26px;
    background: none;
`;

export default function NavBar() {

    return <StyledNavBar>
        <NavButton style={{ color: "#5595ff" }}><RiMovie2Fill /></NavButton>
        <span style={{ flexGrow: 1, }}></span>
        <NavButton style={{ color: "#747474" }}><RiInformationFill /></NavButton>
    </StyledNavBar>
}