import React from 'react';
import styled from 'styled-components';

import ChatElem from './ChatElem';
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

const Chat = () => (
<MainContainer>
    <Header
        displaySearchBar={false}
    />
    <ChatContainer>
        <ChatElems>
            <ChatElem />
            <ChatElem />
            <ChatElem />
            <ChatElem />
            <ChatElem />
        </ChatElems>
        <ChatMenu />
    </ChatContainer>
</MainContainer>
);

export default Chat;