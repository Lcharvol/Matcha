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
import UserSugest from '../UserSugest';

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
    background-color:white;
`;

const Content = styled.div`
    display:flex;
    flex:1;
    flex-wrap: wrap;
    width:100%;
    justify-content: center;
    align-items: flex-start;
    margin-top:15px;
    margin-bottom:15px;
`;

const Home = ({ user, users }) => (
    <MainContainer>
        <Header />
        <Content>
            {users.details && map(user => <UserSugest key={user.id} user={user}/>, users.details)}
        </Content>
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
