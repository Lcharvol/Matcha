import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    justify-content: center;
    align-items: flex-start;
    width:230px;
    height:200px;
    margin:0px;
`;

const ProfilPicture = styled.div`
    width:90%;
    height:130px;
    margin-top:10px;
    background-color:rgb(225,225,225);
    border-radius:2px;
    background-image:${({ picture }) => `url('${picture}.jpg')`};
    background-size:100%;
`;

const Name = styled.p`
    font-weight: bold;
    color:rgb(25,25,25);
    margin: 0;
    margin-top:5px;
`;

const UserSugest = ({ user }) => (
    <Container>
        <ProfilPicture picture={user.photo_1}/>
        <Name>{`${user.firstname} ${user.lastname}`}</Name>
    </Container>
);

UserSugest.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserSugest;