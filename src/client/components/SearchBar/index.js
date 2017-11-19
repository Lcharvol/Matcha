import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position:relative;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    flex:2;
    max-width:600px;
    height:40px;
`;

const InputStyled = styled.input`
    border: none;
    padding-left: 10px;
    font-size: 0.9em;
    margin: 10px;
    height: 35px;
    margin:0;
    margin-left:25px;
    width: 100%;
    border:1px solid #eaeaea;
    outline:none;
}`;

const ButtonStyled = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    min-width: 55px;
    border: 1px solid rgb(230, 230, 230);
    border-left:0px;
    background-color:white;
    border-radius: 0 2px 2px 0;
    margin: 0;
    height: 35px;
    border-style: solid;
`;

const ButtonIcon = styled.i`
    color: rgba(244, 92, 67, 0.85);
    font-size:1.3em;
`;

const SearchBar = () => (
    <Container>
        <InputStyled type="search" />
        <ButtonStyled>
            <ButtonIcon className="fa fa-search" aria-hidden="true" />
        </ButtonStyled>
    </Container>
);

export default SearchBar;