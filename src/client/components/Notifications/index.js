import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { map, compose } from 'ramda';
import { bindActionCreators } from 'redux';

import { getAllNotifsDetails, getUnseenNotificationCompteur } from '../../selectors/notifications';
import { reqGetNotifs, reqGetUnseenNotifs, reqSeenNotifs  } from '../../request';
import { loadAllNotifications, resetNotifCompteur, displayNotifCompteur } from '../../actions/notifications';
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
    unseenNotifications = 0,
    loadAllNotifications,
    resetNotifCompteur,
    socket
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
                      loadAllNotifications(notifications)
                      return reqSeenNotifs();
                    })
                    .then((res) => {
                        resetNotifCompteur();
                    })
                }
                className="fa fa-bell-o" aria-hidden="true" title="Notification"
            />
            <Text>{unseenNotifications === 0 ? '' : unseenNotifications}</Text>
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
    unseenNotifications: PropTypes.number,
    loadAllNotifications: PropTypes.func,
    resetNotifCompteur: PropTypes.func,
}
const actions = { loadAllNotifications, displayNotifCompteur, resetNotifCompteur };

const mapStateToProps = state => ({
  notifications: getAllNotifsDetails(state),
  unseenNotifications: getUnseenNotificationCompteur(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
          reqGetUnseenNotifs()
          .then(({ details: unseenNotifications }) => {
            this.props.displayNotifCompteur(unseenNotifications)
          }).catch(err => err);
        },
    }),
)

export default enhance(Notifications);
