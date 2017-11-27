import React from 'react';
import styled from 'styled-components';
import { withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Container = styled(Link)`
    display:flex;
    flex-direction:column;
    position:relative;
    justify-content: center;
    align-items: flex-start;
    width:430px;
    @media (max-width: 2000px) {
        width:25%;
    }
    @media (max-width: 1500px) {
        width:33.3%;
    }
    @media (max-width: 1000px) {
        width:50%;
    }
    @media (max-width: 500px) {
        width:100%;
    }
    margin:0px;
    &:hover {
        text-decoration:none;
    }
`;

const ProfilPicture = styled.div`
    position:relative;
    width:100%;
    min-height:500px;
    background-color:rgb(225,225,225);
    background-image:${({ picture }) => `url('${picture}.jpg')`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor:pointer;
`;

const Name = styled.p`
    color:rgb(45,45,45);
    margin: 0;
    margin-top:5px;
`;

const Shadow = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    min-height:500px;
    background-color:rgba(0,0,0,0.2);
`;

const ShadowIcon = styled.i`
    color:rgba(255,255,255,0.7);
    font-size:3em;
    text-decoration:none '!important';
    &:hover {
        text-decoration:none;
    }
`;

const formate = string => string.replace(/(^|\s|[\-\,\.])\w/g,function(cWrd){return cWrd.toUpperCase()});

const UserSugest = ({
    user,
    displayShadow,
    showShadow,
    hideShadow,
}) => (
    <Container to={`/user/${user.id}`}>
        <ProfilPicture
            onMouseEnter={showShadow}
            onMouseLeave={hideShadow}
            picture={user.photo_5}
        >
            {displayShadow &&
                <Shadow>
                    <ShadowIcon className="fa fa-search" aria-hidden="true" style={{ textDecoration: 'none !important'}}/>
                </Shadow>
            }
        </ProfilPicture>
    </Container>
);

UserSugest.propTypes = {
    user: PropTypes.object.isRequired,
    displayShadow: PropTypes.bool.isRequired,
    showShadow: PropTypes.func.isRequired,
    hideShadow: PropTypes.func.isRequired,
}
const enhance = withStateHandlers(
    {
        displayShadow: false,
    },
    {
        showShadow: () => () => ({ displayShadow: true }),
        hideShadow: () => () => ({ displayShadow: false }),
    },
);

export default enhance(UserSugest);