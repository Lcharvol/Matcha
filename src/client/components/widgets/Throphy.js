import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ThrophyStyled = styled.div`
  display:flex;
  font-size:1.6em;
  min-width:60px;
  min-height:60px;
  max-width:60px;
  max-height:60px;
  border-radius: 500px;
  background-color:${({ color = 'rgb(245,245,245)' }) => color};
  margin: 15px;
`;

const ThrophyIcon = styled.i`
  color:white;
  margin:auto;
  margin-top:19px;
`;

const Throphy = ({ throphy: { name, icon, color } }) => (
  <ThrophyStyled icon={icon} color={color}>
    <ThrophyIcon className={`fa fa-${icon}`} aria-hidden="true" />
  </ThrophyStyled>
);

Throphy.propTypes = {
  throphy: PropTypes.object.isRequired,
}

export default Throphy;