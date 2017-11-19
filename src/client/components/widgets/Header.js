import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { Logo, Spacer } from '../widgets';
import SearchBar from '../SearchBar';

const HeaderStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    min-height:65px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    background-color:white;
`;

const HeaderLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex:3;
`;

const HeaderRight = styled.div`
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`;

const Icon = styled.i`
    color: rgba(244, 92, 67, 0.85);
    margin-left:25px;
    font-size: 1.6em;
    cursor: pointer;
    &:hover {
        transition: all 60ms ease;
        opacity: .85;
    }
`;

const Header = () => (
  <HeaderStyled>
    <HeaderLeft>
      <Spacer />
      <Logo width="40"/>
      <SearchBar />
    </HeaderLeft>
    <HeaderRight>
      <Link to={`/login`}>
        <Icon className="fa fa-sign-out" aria-hidden="true" title="Disconnect" onClick={() => localStorage.removeItem('matchaToken')}/>
      </Link>
      <Spacer size={10}/>
    </HeaderRight>
  </HeaderStyled>
);

export default Header;
