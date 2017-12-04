import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChatElemContainer = styled.div`
    padding-left:25px;
    padding-right:25px;
    display:flex;
    justify-content: flex-start;
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
    background-position: center;
    background-repeat: no-repeat;
`;

const ChatElem = ({ message = {}}) => (
    <ChatElemContainer>
        <Avatar picture={'/uploads/f6'}/>
        <Text>tuqweouoqiweupoquweiruqwer</Text>
    </ChatElemContainer>
);

ChatElem.propTypes = {
    message: PropTypes.object,
}

export default ChatElem;