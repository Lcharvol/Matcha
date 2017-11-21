import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    margin-top: ${({ top  }) => top};
`;

const AvatarStyled = styled.div`
    display:flex;
    position:absolute;
    min-width:95px;
    min-height:95px;
    max-width:95px;
    max-height:95px;
    border-radius:200px;
    background-image: ${({ avatar  }) => `url(${avatar}.jpg)`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const AvatarContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:130px;
    height:130px;
    border-radius:500px;
    background-color:white;
`;

const ScoreIcon = styled.i`
    margin-top:-6.5px;
    font-size:2.5em;
    color:#EA5555;
`;

const ScoreContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

const Score = styled.p`
    color:white;
    font-size:0.8em;
    margin-top:-29px;
`;

const Avatar = ({ user, size = 'big', top = '0px' }) => (
    <Content top={top}>
        <AvatarContainer>
            <CircularProgress
                size={120}
                thickness={8}
                mode={'determinate'}
                value={user.popularity}
                color="#EA5555"
            />
            <AvatarStyled avatar={user.photo_5}/>
        </AvatarContainer>
        <ScoreContainer>
            <ScoreIcon className="fa fa-heart" aria-hidden="true"/>
            <Score>{user.popularity}</Score>
        </ScoreContainer>
    </Content>
);

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.string,
    top: PropTypes.string,
}

export default Avatar;