import React, { Component }from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'ramda';
import { connect } from 'react-redux';
import { compose, lifecycle, withState, withStateHandlers } from 'recompose';

import _ from 'lodash';
import { getUser, getUsers } from '../../selectors/user';
import ChatElem from './ChatElem';
import { reqGetAllConversation, reqAddMsg } from '../../request';
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
    max-width:400px;
    height:80vh;
    background-color:white;
    border-radius:3px;
`;

const ChatElems = styled.div`
    flex:1;
    overflow:auto;
    overflow-y: scroll;
    padding-top:25px;
`;

const ChatMenu = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    bottom:0;
    width:100%;
    height:70px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    background-color:white;
`;

const ButtonStyled = styled.button`
    margin-left:15px;
`;

class Chat extends React.Component {

  state = {
    messages: [],
    message: ''
  }

  componentDidMount() {
    reqGetAllConversation(Number(window.location.pathname.substr(6)))
      .then(res => {
        this.setState({ messages: res.details });
      })
      .catch(err => {
      });
     this.props.io.on('chat', (data) => {
        this.setState({ messages: [ ...this.state.messages, data ] })
     });
    }

    handleChange = (evt) => {
      this.setState({ message: evt.target.value });
    }

    handleAddMessages = (evt) => {
      evt.preventDefault();
      const { message, messages } = this.state;
      const idReceive = Number(window.location.pathname.substr(6));
      const { user } = this.props;
      if (message && !/^[a-zA-Z0-9 ?!'àèéêá]{1,150}$/i.test(message)) {
       return alert('BAD BAD BAD');
      }
      const messageOptimistic = { id: new Date().getTime(), user_send: user.id, user_receive: idReceive, msg: message, date: new Date() };
      console.log(messages, messageOptimistic)
      this.setState({ messages: [...messages, messageOptimistic ] });
      reqAddMsg({ msg: message, id: Number(window.location.pathname.substr(6)) })
        .then(res => {})
        .catch(res => {
          alert('Bad Message');
          console.log(_.drop(messages, messageOptimistic))
          this.setState({ messages: _.drop(messages, messageOptimistic) })
        });
    }

    render() {
        const { props: { user = {}, users = [] } } = this;
        const { state: { messages, message } } = this;
        return (
            <MainContainer>
                <Header
                    displaySearchBar={false}
                />
                <ChatContainer>
                    {!isEmpty(user) && !isEmpty(users) && <ChatElems>
                        {map(message =>
                            <ChatElem key={message.id} message={message} user={user} users={users}/>
                            , messages)}
                    </ChatElems>}
                    <ChatMenu>
                        <input className="pt-input pt-round" type="text" placeholder="Aa" dir="auto"  value={message} onChange={this.handleChange}/>
                        <ButtonStyled type="button" className="pt-button" onClick={this.handleAddMessages}>Send</ButtonStyled>
                    </ChatMenu>
                </ChatContainer>
            </MainContainer>
        );
    }
};

Chat.propTypes = {
    messages: PropTypes.array,
    user: PropTypes.object,
    users: PropTypes.array,
}

const mapStateToProps = state => ({
    user: getUser(state),
    users: getUsers(state),
    io: state.io,
    handleSetMessages: () => (messages) => ({ messages}),
});

export default connect(mapStateToProps)(Chat);
