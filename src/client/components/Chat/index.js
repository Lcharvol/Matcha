import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'ramda';
import { connect } from 'react-redux';
import { compose, lifecycle, withState, withStateHandlers } from 'recompose';

import { getUser, getUsers } from '../../selectors/user';
import ChatElem from './ChatElem';
import { reqGetAllConversation } from '../../request';
import { Header } from '../widgets';

const MainContainer = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    min-height:100vh;
    background-color:rgb(240,240,240);
`;

const ChatContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:auto;
    margin-top:100px;
    width:100%;
    max-width:500px;
    min-height:80vh;
    background-color:white;
    border-radius:3px;
`;

const ChatElems = styled.div`
    flex:1;
    overflow:auto;
    padding-top:25px;
`;

const ChatMenu = styled.div`
    display:flex;
    bottom:0;
    width:100%;
    height:70px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    background-color:white;
`;

const Chat = ({ messages = [], user = {}, users = [],
}) => (
    <MainContainer>
        {console.log('messages: ', messages)}
        <Header
            displaySearchBar={false}
        />
        <ChatContainer>
            {!isEmpty(user) && !isEmpty(users) && <ChatElems>
                {map(message =>
                    <ChatElem key={message.date} message={message} user={user} users={users}/>
                    , messages)}
            </ChatElems>}
            <ChatMenu />
        </ChatContainer>
    </MainContainer>
);

Chat.propTypes = {
    messages: PropTypes.array,
    user: PropTypes.object,
    users: PropTypes.array,
}

const mapStateToProps = state => ({
    user: getUser(state),
    users: getUsers(state),
});

const enhance = compose(
    connect(mapStateToProps),
    withStateHandlers(
        {
            messages: [],
        },
        {
            handleSetMessages: () => (messages) => ({ messages}),
        },
    ),
    lifecycle({
        componentDidMount() {
            reqGetAllConversation(Number(window.location.pathname.substr(6)))
            .then(res => {
                this.props.handleSetMessages(res.details);
            })
            .catch(err => {
                // redirection sur le history
            });
        },
    }),
);

export default enhance(Chat);