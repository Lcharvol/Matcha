import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { map } from 'ramda';
import { resetUnreadNotifications } from '../../actions/notifications';
import { bindActionCreators } from 'redux';
import { getNotifications, getUnreadNotifications } from '../../selectors/notifications';
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
    margin-left:5px;
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
    max-height:500px;
    overflow: scroll;
`;

const TitleContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    background-color:white;
    box-shadow:inset 0 0 0.4px rgb(180,180,180);
    height:40px;
`;

const Notifications = ({ notifications = [], unreadNotifications = [], resetUnreadNotifications}) => (
    <Popover
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM_RIGHT}
    >
        <IconContainer>
            <Icon onClick={
                () => resetUnreadNotifications()
            }className="fa fa-bell-o" aria-hidden="true" title="Notification"/>
            <Text>{unreadNotifications.length}</Text>
        </IconContainer>
        <Content>
            <TitleContainer>
                <Title>Notification</Title>
            </TitleContainer>
            {map(notification => 
                <Notification
                    key={notification.id}
                    notification={notification}
                />
            , notifications)}
        </Content>
    </Popover>
);

Notification.propTypes = {
    notifications: PropTypes.array,
    unreadNotifications: PropTypes.array,
    resetUnreadNotifications: PropTypes.func.isRequired,
}
const actions = { resetUnreadNotifications };

const mapStateToProps = state => ({
  notifications: getNotifications(state),
  unreadNotifications: getUnreadNotifications(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(Notifications);