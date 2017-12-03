import React from 'react';
import styled from 'styled-components';
import { isNil } from 'ramda';
import PropTypes from 'prop-types';

const ConnectedInfoStyled = styled.div`
    position:absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    top:20px;
    right:20px;
`;

const ConnectedPoint = styled.div`
    display:flex;
    width:10px;
    height:10px;
    border-radius:100px;
    background-color: ${({ connected }) => connected ? '#2ecc71' : '#e74c3c'};
`;

const ConnectedText = styled.p`
    margin:0;
    color: ${({ connected }) => connected ? '#2ecc71' : '#e74c3c'};
    margin-right:10px;
`;

const getLastCoDate = cotime => {
    const date = new Date(cotime);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `SINCE  ${day}/${month}/${year}`;
}

const ConnectedInfo = ({ user }) => (
    <ConnectedInfoStyled>
        <ConnectedText connected={user.connected}>{user.connected ? 'ONLINE' : 'OFFLINE'}</ConnectedText>
        {user.connected == false && !isNil(user.cotime) &&
            <ConnectedText connected={user.connected}>{getLastCoDate(user.cotime)}</ConnectedText>
        }
        <ConnectedPoint connected={user.connected}/>
    </ConnectedInfoStyled>
);

ConnectedInfo.propTypes = {
    user: PropTypes.object.isRequired,
};

export default ConnectedInfo;