import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Avatar } from '../widgets';

const Container = styled.div`
    width: 90%;
    max-width:800px;
    min-height:500px;
    background-color:white;
    border-radius: 2px;
`;

const Profil = ({ user }) => (
    <Container>
        <Avatar user={user} top={'-60px'}/>
    </Container>
);

Profil.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Profil;
