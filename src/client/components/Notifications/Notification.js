import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NotificationContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    width:100%;
    min-height:75px;
    background-color:white;
    box-shadow:inset 0 0 0.4px rgb(180,180,180);
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        padding-left:25px; 
    }
`;

const Avatar = styled.div`
    width:50px;
    height:50px;
    border-radius:100%;
    background-image:${({ picture }) => `url('${picture}')`};
    background-size: cover;
    margin-left:15px;
    background-position: center;
    background-repeat: no-repeat;
`;

const Notification = () => (
    <NotificationContainer>
        <Avatar picture={'https://cdn.intra.42.fr/users/medium_lcharvol.jpg'}/>
    </NotificationContainer>
);

export default Notification;