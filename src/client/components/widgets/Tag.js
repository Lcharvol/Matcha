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
    background-color:rgb(250,250,250);
    box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.07);
`;

const Tag = ({ name }) => (
  <TagStyled>
    # {name}
  </TagStyled>
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tag;
