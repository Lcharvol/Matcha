import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AvatarStyled = styled.div`
    display:flex;
    min-width:100px;
    min-height:100px;
    max-width:100px;
    max-height:100px;
    border-radius:200px;
    background-image: ${({ avatar  }) => `url(${avatar})`};
    background-position:center center;
`;

const Avatar = ({ avatar }) => (
    <AvatarStyled avatar={avatar}/>
);

Avatar.propTypes = {
    avatar: PropTypes.string.isRequired,
}

export default Avatar;