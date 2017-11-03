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
    background-color:white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14);
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
    color: rgba(244, 92, 67, 0.9);
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
      <Spacer size={20}/>
      <Logo width={70} justifycontent='flex-start'/>
    </HeaderLeft>
    <HeaderRight>
      <Icon className="fa fa-cog" aria-hidden="true"/>
      <Link to={`/login`}>
        <Icon className="fa fa-sign-out" aria-hidden="true"/>
      </Link>
      <Spacer size={10}/>
    </HeaderRight>
  </HeaderStyled>
);

export default Header;