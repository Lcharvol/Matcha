import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map } from 'ramda';

import UserSugest from '../UserSugest';

const Content = styled.div`
    display:flex;
    flex:1;
    flex-wrap: wrap;
    width:100%;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top:65px;
    margin-bottom:15px;
    z-index:0;
`;

const List = ({ users, filterUsers }) => (
    <Content>
        {map(user =>
            <UserSugest
                key={user.id}
                user={user}
            />, users)
        }
    </Content>
);

List.propTypes = {
    users: PropTypes.array.isRequired,
    filterUsers: PropTypes.func.isRequired,
}

export default List;
