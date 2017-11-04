import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../selectors/user';
import { Header, Container, Avatar } from '../widgets';
import { Link } from 'react-router';
import Profil from '../Profil';
import Suggestion from '../Suggestion';

const Content = styled.div`
    display:flex;
    flex-wrap: wrap;
    width:100%;
    justify-content: center;
    align-items: center;
    margin-bottom:20px;
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
    min-width:100px;
    max-width:100px;
    min-height:100px;
    max-height:100px;
    background-color:white;
    border-radius:4px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.10);
    margin:30px;
    cursor:pointer;
    &:hover {
        transition: all 60ms ease;
        opacity: .8;
        margin-top:20px;
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

const Home = ({ user }) => (
    <div>
        <Header />
        <Container width='450px' top='20vh'>
            <Avatar user={user} top='-80px'/>
            <Name>{`${user.firstName} ${user.lastName}`}</Name>
            <Content>
                <LinkStyled>
                    <Icon className="fa fa-user" aria-hidden="true" />
                </LinkStyled>
                <LinkStyled>
                    <Icon className="fa fa-search" aria-hidden="true" />
                </LinkStyled>
                <LinkStyled to='/profil'>
                    <Icon className="fa fa-pencil" aria-hidden="true" />
                </LinkStyled>
                <LinkStyled>
                    <Icon className="fa fa-comments" aria-hidden="true" />
                </LinkStyled>
            </Content>
        </Container>
    </div>
);

Home.propTypes = {
    user: PropTypes.object.isRequired,
}

const actions = {};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);