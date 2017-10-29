import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TagStyled = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    min-width:100px;
    padding:5px;
    margin: 10px;
    border-radius:100px;
    background-color:rgb(240,240,240);
`;

const Tag = ({ name }) => (
  <TagStyled>
    # {name}
  </TagStyled>
);

Tag.PropTypes = {
  name: PropTypes.string.isRequired,
};

export default Tag;
