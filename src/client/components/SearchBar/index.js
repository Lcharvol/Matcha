import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getSearch } from '../../selectors/user';
import { updateSearchUsersType, updateSearchUsersValue, searchUsers } from '../../actions/users';
import PropTypes from 'prop-types';
import SortMenu from '../SortMenu';
import { Spacer } from '../widgets';

const Container = styled.div`
    position:relative;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    flex:2;
    max-width:600px;
    height:40px;
`;

const SearchInput = styled.input`
    border: none;
    padding-left: 10px;
    font-size: 0.9em;
    margin: 10px;
    height: 35px;
    margin:0;
    margin-left:25px;
    width: 100%;
    border:1px solid #eaeaea;
    outline:none;
}`;

const ButtonStyled = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    min-width: 55px;
    border: 1px solid rgb(230, 230, 230);
    background-color:white;
    border-radius: 0 2px 2px 0;
    margin: 0;
    height: 35px;
    border-style: solid;
`;

const ButtonIcon = styled.i`
    color: rgba(244, 92, 67, 0.85);
    font-size:1.3em;
`;

const searchTypes = [
    { key: 'age', label: 'Search by age'},
    { key: 'popularity', label: 'Search by popularity'},
    { key: 'location', label: 'Search by location'},
    { key: 'tags', label: 'Search by commun tags'},
];

const searchValue = {
    age: [
        { key: '20', label: 'at least 20 years'},
        { key: '30', label: 'at least 30 years'},
        { key: '40', label: 'at least 40 years'},
        { key: '50', label: 'at least 50 years'},
        { key: '60', label: 'at least 60 years'},
        { key: '70', label: 'at least 70 years'},
        { key: '80', label: 'at least 80 years'},
    ],
    location: [
        { key: '20', label: 'at least 20 km'},
        { key: '30', label: 'at least 30 km'},
        { key: '40', label: 'at least 40 km'},
        { key: '50', label: 'at least 50 km'},
        { key: '60', label: 'at least 60 km'},
        { key: '70', label: 'at least 70 km'},
        { key: '80', label: 'at least 80 km'},
    ],
    interest: [
        { key: '20', label: 'at least 20 km'},
        { key: '30', label: 'at least 30 km'},
        { key: '40', label: 'at least 40 km'},
        { key: '50', label: 'at least 50 km'},
        { key: '60', label: 'at least 60 km'},
        { key: '70', label: 'at least 70 km'},
        { key: '80', label: 'at least 80 km'},
    ],
    popularity: [
        { key: '20', label: 'at least 20 km'},
        { key: '30', label: 'at least 30 km'},
        { key: '40', label: 'at least 40 km'},
        { key: '50', label: 'at least 50 km'},
        { key: '60', label: 'at least 60 km'},
        { key: '70', label: 'at least 70 km'},
        { key: '80', label: 'at least 80 km'},
    ],
}
const SearchBar = ({
    onChange,
    filter,
    resetValue,
    searchUsers,
    updateSearchUsersType,
    updateSearchUsersValue,
    search,
}) => (
    <Container>
        <SortMenu
            sortTypes={searchTypes}
            onClick={updateSearchUsersType}
            sort={search}
            position={'relative'}
            text='Search by'
            width='65px'
            icon='bars'
        />
        <SortMenu
            sortTypes={searchValue[search.by]}
            onClick={updateSearchUsersValue}
            sort={search}
            position={'relative'}
            icon='sort-desc'
        />
        <ButtonStyled>
            <ButtonIcon className="fa fa-search" aria-hidden="true" onClick={() => searchUsers()}/>
        </ButtonStyled>
    </Container>
);

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    filter: PropTypes.string,
    resetValue: PropTypes.func,
    updateSearchUsersType: PropTypes.func.isRequired,
    updateSearchUsersValue: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
}

const actions = { updateSearchUsersType, updateSearchUsersValue, searchUsers };

const mapStateToProps = state => ({
  search: getSearch(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);