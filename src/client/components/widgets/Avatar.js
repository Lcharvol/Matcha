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
    background-size: 100%;
`;

const AvatarContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:120px;
    height:120px;
    border-radius:500px;
    background: linear-gradient( 160deg, rgba(244, 92, 67, 0.7) 0%, #EA5555  100%);
`;

const Avatar = ({ user, size = 'big' }) => (
    <div>
        <AvatarContainer>
            <AvatarStyled avatar={user.avatar}/>
        </AvatarContainer>
    </div>
);

Avatar.propTypes = {
    user: PropTypes.string.isRequired,
    size: PropTypes.string,
}

export default Avatar;