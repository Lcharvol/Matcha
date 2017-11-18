import React from 'react';
import styled from 'styled-components';
import { Logo, Spacer } from '../widgets';
import { Link } from 'react-router'

const HeaderStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    min-height:100px;
`;

const HeaderLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex:1;
`;

const HeaderRight = styled.div`
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`;

const Icon = styled.i`
    color: white;
    margin-left:25px;
    font-size: 2em;
    cursor: pointer;
    &:hover {
        transition: all 60ms ease;
        opacity: .85;
    }
`;

const Header = () => (
  <HeaderStyled>
    <HeaderLeft>
      <Link to={`/`}>
        <Icon className="fa fa-home" aria-hidden="true" title="Home"/>
      </Link>
      <Link to={`/login`}>
        <Icon className="fa fa-cog" aria-hidden="true" title="Profile"/>
      </Link>
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
