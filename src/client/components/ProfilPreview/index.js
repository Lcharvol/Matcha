import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Profil from './Profil';

const Container = styled.div`
    position:fixed;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.3);
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:1000;
`;

const ProfilPreview = ({ user, hideProfilPreview }) => (
    <Container onClick={hideProfilPreview}>
        <Profil user={user}/>
    </Container>
);

ProfilPreview.propTypes = {
    user: PropTypes.object.isRequired,
    hideProfilPreview: PropTypes.func.isRequired,
}

export default ProfilPreview;