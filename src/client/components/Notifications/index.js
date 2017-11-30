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
    font-size:1.5em;
`;

const Notifications = () => (
    <Popover
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName="pt-popover-content-sizing"
        position={Position.BOTTOM_RIGHT}
    >
        <IconContainer>
            <Icon className="fa fa-bell-o" aria-hidden="true" title="Notification"/>
            <Text>0</Text>
        </IconContainer>
        <div>
            <Title>Notification</Title>
            <Notification />
            <Notification />
            <Notification />
        </div>
    </Popover>
);

export default Notifications;