import React from 'react';
import styled from 'styled-components';
import { withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import ProfilPreview from '../ProfilPreview';

const Container = styled.div`
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
`;

const ProfilPicture = styled.div`
    width:100%;
    min-height:300px;
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
    height:100%;
    background-color:rgba(0,0,0,0.2);
`;

const ShadowIcon = styled.i`
    color:rgba(255,255,255,0.7);
    font-size:3em;
`;

const formate = string => string.replace(/(^|\s|[\-\,\.])\w/g,function(cWrd){return cWrd.toUpperCase()});

const UserSugest = ({
    user,
    displayShadow,
    showShadow,
    hideShadow,
    displayProfilPreview,
    showProfilPreview,
    hideProfilPreview,
}) => (
    <Container>
        {displayProfilPreview &&
            <ProfilPreview
                user={user}
                hideProfilPreview={hideProfilPreview}
            />
        }
        <ProfilPicture
            onClick={showProfilPreview}
            onMouseEnter={showShadow}
            onMouseLeave={hideShadow}
            picture={user.photo_5}
        >
            {displayShadow &&
                <Shadow>
                    <ShadowIcon className="fa fa-search" aria-hidden="true"/>
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
    displayProfilPreview: PropTypes.bool.isRequired,
    showProfilPreview: PropTypes.func.isRequired,
    hideProfilPreview: PropTypes.func.isRequired,
}
const enhance = withStateHandlers(
    {
        displayShadow: false,
        displayProfilPreview: false,
    },
    {
        showShadow: () => () => ({ displayShadow: true }),
        hideShadow: () => () => ({ displayShadow: false }),
        showProfilPreview: () => () => ({ displayProfilPreview: true }),
        hideProfilPreview: () => () => ({ displayProfilPreview: false }),
    },
);

export default enhance(UserSugest);
