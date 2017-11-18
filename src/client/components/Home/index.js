import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { getUser, getUsers } from '../../selectors/user';
import { Header, Container, Avatar } from '../widgets';
import { Link } from 'react-router';
import { loadUsers } from '../../actions/users';
import { reqGetAll } from '../../request';
import Profil from '../Profil';

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
    width:100%;
    background-color:white;
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
    </MainContainer>
);

Home.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
}

const actions = { loadUsers };

const mapStateToProps = state => ({
  user: getUser(state),
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentWillMount() {
            reqGetAll()
            .then(users => {
                const { loadUsers } = this.props;
                console.log('users: ', users)
                loadUsers(users);
            });
        },
    }),
)

export default enhance(Home);
