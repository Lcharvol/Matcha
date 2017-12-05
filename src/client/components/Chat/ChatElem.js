import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getProfilPictureById } from '../../selectors/user';

const ChatElemContainer = styled.div`
    padding-left:25px;
    padding-right:25px;
    display:flex;
    justify-content:${({ position }) => position};
    align-items: center;
    width:100%;
    height:70px;
`;

const Text = styled.p`
    margin:0;
    margin-left:20px;
    margin-right:20px;
`;

const Avatar = styled.div`
    width:50px;
    height:50px;
    border-radius:100%;
    background-image:${({ picture }) => `url('${picture}.jpg')`};
    background-size: cover;
    margin-left:15px;
    margin-right:15px;
    background-position: center;
    background-repeat: no-repeat;
`;

const ChatElem = ({ message, users, user }) => (
    <ChatElemContainer position={user.id === message.user_send ? 'flex-end' : 'flex-start'}>
        {user.id !== message.user_send && <Avatar picture={user.id === message.user_send ? user.profile_picture : getProfilPictureById(users, message.user_send)}/>}
        <Text>{message.msg}</Text>
        {user.id === message.user_send && <Avatar picture={user.id === message.user_send ? user.profile_picture : getProfilPictureById(users, message.user_send)}/>}
    </ChatElemContainer>
);

ChatElem.propTypes = {
    message: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
}

export default ChatElem;