import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const LogoStyled = styled.img`
    width: ${({ width }) => `${width}px`};
`;

const LogoContainer = styled.div`
    display:flex;
    justify-content: ${({ justifycontent }) => justifycontent};
    align-items: center;
`;

const Logo = ({ width = 50, justifycontent = 'center' }) => (
    <LogoContainer justifycontent={justifycontent}>
        <Link to={`/`}>
            <LogoStyled src="logo.svg" className="App-logo" alt="logo" width={width}/>
        </Link>
    </LogoContainer>
);

Logo.propTypes = {
    width: PropTypes.number,
}

export default Logo;