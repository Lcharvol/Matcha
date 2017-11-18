import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    position:relative;
    justify-content: center;
    align-items: flex-start;
    width:230px;
    height:200px;
    margin:15px;
`;

const ProfilPicture = styled.div`
    width:90%;
    height:130px;
    margin-top:10px;
    background-color:rgb(225,225,225);
    border-radius:2px;
`;

const UserSugest = () => (
    <Container>
        <ProfilPicture />
    </Container>
);

export default UserSugest;