import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const NotificationContainer = styled(Link)`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    width:100%;
    min-height:75px;
    background-color:white;
    box-shadow:inset 0 0 0.4px rgb(180,180,180);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    &:hover {
        padding-left:10px;
        text-decoration: none;
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

const Text = styled.p`
    margin:0;
    margin-left:10px;
`;

const Notification = ({ notification = {}}) => (
    <NotificationContainer to={`/user/${notification.user_send}`}>
        <Avatar picture={'https://cdn.intra.42.fr/users/medium_lcharvol.jpg'}/>
        <Text>{notification.details}</Text>
    </NotificationContainer>
);

Notification.propTypes = {
    notification: PropTypes.object,
};

export default Notification;