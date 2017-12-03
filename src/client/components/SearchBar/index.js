import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getSearch } from '../../selectors/user';
import { updateSearchUsersType, updateSearchUsersValue, searchUsers } from '../../actions/users';
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
    { key: 'interest', label: 'Search by commun tags'},
];

const searchValue = {
    age: [
        { key: '25', label: 'plus de 25 ans'},
        { key: '30', label: 'plus de 30 ans'},
        { key: '35', label: 'plus de 35 ans'},
        { key: '40', label: 'plus de 40 ans'},
        { key: '50', label: 'plus de 50 ans'},
        { key: '60', label: 'plus de 60 ans'},
        { key: '70', label: 'plus de 70 ans'},
    ],
    location: [
        { key: '500', label: 'moins de 500 m'},
        { key: '1000', label: 'moins de 1 km'},
        { key: '3000', label: 'moins de 3 km'},
        { key: '5000', label: 'moins de 5 km'},
        { key: '7000', label: 'moins de 7 km'},
        { key: '10000', label: 'moins de 10 km'},
        { key: '20000', label: 'moins de 20 km'},
    ],
    interest: [
        { key: '5', label: 'au moins 5 tags en commun'},
        { key: '4', label: 'au moins 4 tags en commun'},
        { key: '3', label: 'au moins 3 tags en commun'},
        { key: '1', label: 'au moins 2 tags en commun'},
        { key: '2', label: 'au moins 1 tags en commun'},
    ],
    popularity: [
        { key: '80', label: 'au moins 80'},
        { key: '60', label: 'au moins 70'},
        { key: '40', label: 'au moins 60'},
        { key: '30', label: 'au moins 50'},
        { key: '20', label: 'au moins 40'},
        { key: '10', label: 'au moins 30'},
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
