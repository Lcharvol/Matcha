import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TagStyled = styled.div`
    display:flex;
    min-height:30px;
    min-width:100px;
    padding:10px;
    background-color:rgb(200,200,200),
    
`;

const Tag = ({ name }) => (
    <TagStyled>
        {name}
    </TagStyled>
);

export default Tag;