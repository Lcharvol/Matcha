import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
    getUser,
    getUsers,
    getFilter,
    getSort,
} from '../../selectors/user';
import {
    loadUsers,
    sortUsers,
    filterUsers,
} from '../../actions/users';
import { reqGetAll } from '../../request';
import { Header, Container, Avatar } from '../widgets';
import Profil from '../Profil';
import SortMenu from '../SortMenu';
import UserSugest from '../UserSugest';

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
    background-color:rgb(240,240,240);
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

const sortTypes = [
    { key: 'age', label: 'Sort by age' },
    { key: 'location', label: 'Sort by location' },
    { key: 'popularity', label: 'Sort by popularity' },
    { key: 'tags', label: 'Sort by commun tags' },
];

const Home = ({
    user,
    users,
    filterUsers,
    onFilterChange,
    sortUsers,
    filter,
    sort,
}) => (
    <MainContainer>
        <Header />
        <SortMenu
            sortTypes={sortTypes}
            onClick={sortUsers}
            sort={sort}
        />
        <Content>
            {map(user =>
                <UserSugest
                    key={user.id}
                    user={user}
                />, users)
            }
        </Content>
    </MainContainer>
);

Home.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    filter: PropTypes.string,
    sort: PropTypes.object,
    filterUsers: PropTypes.func.isRequired,
    sortUsers: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
}

const actions = { loadUsers, sortUsers, filterUsers, };

const mapStateToProps = state => ({
  user: getUser(state),
  users: getUsers(state),
  filter: getFilter(state),
  sort: getSort(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentWillMount() {
            reqGetAll()
            .then(users => {
                const { loadUsers } = this.props;
                loadUsers(users);
            });
        },
        
    }),
    withHandlers({
        onFilterChange: ({ filterUsers }) => event =>
          filterUsers(event.target.value),
    }),
)

export default enhance(Home);
