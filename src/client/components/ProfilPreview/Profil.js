import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    width: 90%;
    max-width:800px;
    min-height:500px;
    background-color:white;
    border-radius: 2px;
`;

const Profil = ({ user }) => (
    <Container>
    </Container>
);

Profil.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Profil;