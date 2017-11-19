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
    width:230px;
    height:200px;
    margin:0px;
    padding:10px;
`;

const ProfilPicture = styled.div`
    width:100%;
    height:130px;
    margin-top:10px;
    background-color:rgb(225,225,225);
    border-radius:2px;
    background-image:${({ picture }) => `url('${picture}.jpg')`};
    background-size:100%;
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
            picture={user.photo_1}
        >
            {displayShadow && 
                <Shadow>
                    <ShadowIcon className="fa fa-search" aria-hidden="true"/>
                </Shadow>
            }
        </ProfilPicture>
        <Name>{`${formate(user.firstname)} ${formate(user.lastname)} - ${user.age} ans`}</Name>
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