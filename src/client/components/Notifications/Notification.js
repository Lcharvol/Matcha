import React from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
    display:flex;
    width:250px;
    min-height:60px;
    border-radius: 2px;
    background-color:rgb(240,240,240);
    cursor: pointer;
    margin-top:10px;
    &:hover {
        box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #B3B3B3;
    }
`;

const Notification = () => (
    <NotificationContainer>
    </NotificationContainer>
);

export default Notification;