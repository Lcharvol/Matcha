import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, getUsers } from '../../selectors/user';
import { Header, Container, Avatar } from '../widgets';
import { Link } from 'react-router';
import Suggestion from '../Suggestion';
import Profil from '../Profil';

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    min-height:100vh;
`;

const Content = styled.div`
    display:flex;
    flex:1;
    flex-wrap: wrap;
    width:100%;
    justify-content: center;
    align-items: center;
    margin-top:15px;
    margin-bottom:15px;
`;

const Icon = styled.i`
    display:flex;
    justify-content: center;
    align-items: center;
    color:#EA5555;
    font-size:2.7em;
    margin:10px;
`;

const LinkStyled = styled(Link)`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    min-width:80px;
    max-width:80px;
    min-height:80px;
    max-height:80px;
    background-color:white;
    border-radius:4px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.10);
    margin:15px;
    cursor:pointer;
    &:hover {
        transition: all 60ms ease;
        opacity: .8;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.10);
    };
    text-decoration:none;
`;

const Name = styled.p`
    color:#EA5555;
    margin:auto;
    margin-top:10px;
    font-size:1.5em;
`;

const Home = ({ user, users }) => (
    <MainContainer>
        <Header />
        <Container width='450px' top='125px'>
            <Avatar user={user} top='-80px'/>
            <Name>{`${user.firstName} ${user.lastName}`}</Name>
            <Content>
                <LinkStyled to='/profil'>
                    <Icon className="fa fa-user" aria-hidden="true" />
                </LinkStyled>
                <LinkStyled>
                    <Icon className="fa fa-search" aria-hidden="true" />
                </LinkStyled>
                <LinkStyled to='/editprofil'>
                    <Icon className="fa fa-pencil" aria-hidden="true" />
                </LinkStyled>
                <LinkStyled to='/chat'>
                    <Icon className="fa fa-comment" aria-hidden="true" />
                </LinkStyled>
            </Content>
        </Container>
        <Suggestion users={users}/>
    </MainContainer>
);

Home.propTypes = {
    user: PropTypes.object.isRequired,
<<<<<<< HEAD
    users: PropTypes.array.isRequired,
=======
>>>>>>> 849fedec8a71d16434cb29f10e1233fbf553c923
}

const actions = {};

const mapStateToProps = state => ({
  user: getUser(state),
<<<<<<< HEAD
  users: getUsers(state),
=======
>>>>>>> 849fedec8a71d16434cb29f10e1233fbf553c923
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
