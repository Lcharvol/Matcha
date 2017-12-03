import React from 'react';
import styled from 'styled-components';
import { Button, Intent, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import Notification from './Notification';

const Icon = styled.i`
    color: rgba(244, 92, 67, 0.85);
    margin-left:25px;
    font-size: 1.6em;
    cursor: pointer;
    &:hover {
        transition: all 60ms ease;
        opacity: .85;
    }
`;

const IconContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    margin:0;
`;

const Title = styled.p`
    margin-bottom:10px;
    font-size:1.3em;
    color:rgba(244, 92, 67, 0.85);
    margin:0;
    margin-left:15px;
`;

const Content = styled.div`
    width:300px;
`;

const TitleContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    background-color:white;
    box-shadow:inset 0 0 0.4px rgb(180,180,180);
    height:40px;
`;

const Notifications = () => (
    <Popover
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM_RIGHT}
    >
        <IconContainer>
            <Icon onClick={
                () => console.log('reset notif')
            }className="fa fa-bell-o" aria-hidden="true" title="Notification"/>
            <Text>0</Text>
        </IconContainer>
        <Content>
            <TitleContainer>
                <Title>Notification</Title>
            </TitleContainer>
            <Notification />
            <Notification />
            <Notification />
        </Content>
    </Popover>
);

export default Notifications;