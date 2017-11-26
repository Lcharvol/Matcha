import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getSearch } from '../../selectors/user';
import Slider from 'material-ui/Slider';
import { searchUsers } from '../../actions/users';
import PropTypes from 'prop-types';
import SortMenu from '../SortMenu';

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
    border-left:0px;
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

const SliderStyled = styled(Slider)`
    width:100%;
    margin:0;
    padding-left: 10px;
    padding-right: 10px;
`;

const searchTypes = [
    { key: 'age', label: 'Search by age'},
    { key: 'popularity', label: 'Search by popularity'},
    { key: 'location', label: 'Search by location'},
    { key: 'tags', label: 'Search by commun tags'},
];

const SearchBar = ({
    onChange,
    filter,
    resetValue,
    searchUsers,
    search,
}) => (
    <Container>
        <SortMenu
            sortTypes={searchTypes}
            onClick={searchUsers}
            sort={search}
            position={'relative'}
            icon='bars'
        />
        {search.by === 'tags' ?
            <SearchInput
                type="search"
                placeholder="Search ..."
                value={filter}
                onChange={onChange}
            />
            :
            <SliderStyled
                defaultValue={0}
                min={0}
                max={100}
                step={25}
                sliderStyle={{
                    margin: 0,
                }}
            />
        }
        <ButtonStyled>
            <ButtonIcon className="fa fa-search" aria-hidden="true" />
        </ButtonStyled>
    </Container>
);

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    filter: PropTypes.string,
    resetValue: PropTypes.func,
    searchUsers: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
}

const actions = { searchUsers };

const mapStateToProps = state => ({
  search: getSearch(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);