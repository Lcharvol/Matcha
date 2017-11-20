import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    display:flex;
    margin-top:90px;
    width:100%;
    height:50px;
`;

const SortMenu = ({ sortTypes, onClick, sort }) => (
    <Container>
    </Container>
);

SortMenu.propTypes = {
    onClick: PropTypes.func.isRequired,
    sort: PropTypes.object.isRequired,
    sortTypes: PropTypes.array.isRequired,
};

export default SortMenu;