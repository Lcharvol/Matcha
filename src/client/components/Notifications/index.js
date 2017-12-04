import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { map, compose } from 'ramda';
import { bindActionCreators } from 'redux';
import { getNotifications, getUnreadNotifications } from '../../selectors/notifications';
import { reqGetNotifs, reqGetUnseenNotifs, reqSeenNotifs  } from '../../request';
import { loadNotifications, resetUnreadNotifications, setUnreadNotifications } from '../../actions/notifications';
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
    overflow: auto;
`;

const TitleContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    background-color:white;
    box-shadow:inset 0 0 0.4px rgb(180,180,180);
    height:40px;
`;

const Notifications = ({
    notifications = [],
    unreadNotifications = 0,
    loadNotifications,
    resetUnreadNotifications,
}) => (
    <Popover
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM_RIGHT}
    >
        <IconContainer>
            <Icon 
                onClick={
                    () => reqGetNotifs()
                    .then(notifications => {
                      loadNotifications(notifications)
                      return reqSeenNotifs();
                    })
                    .then((res) => {
                        resetUnreadNotifications();
                    })
                }
                className="fa fa-bell-o" aria-hidden="true" title="Notification"
            />
            <Text>{unreadNotifications === 0 ? '' : unreadNotifications}</Text>
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
    unreadNotifications: PropTypes.number,
    loadNotifications: PropTypes.func,
    resetUnreadNotifications: PropTypes.func,
}
const actions = { loadNotifications, setUnreadNotifications, resetUnreadNotifications };

const mapStateToProps = state => ({
  notifications: getNotifications(state),
  unreadNotifications: getUnreadNotifications(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
          reqGetUnseenNotifs()
          .then(unreadNotifications => {
            this.props.setUnreadNotifications(unreadNotifications.details)
          })
          .catch(err => {
          });
        },
    }),
)

export default enhance(Notifications);