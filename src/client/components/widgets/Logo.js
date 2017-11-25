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
    justify-content: center;
`;

const LinkStyled = styled(Link)`
    display:flex;
    align-items: center;
    justify-content: center;
`;

const Logo = ({ width = 50, justifycontent = 'center' }) => (
    <LogoContainer justifycontent={justifycontent}>
        <LinkStyled to={`/`}>
            <LogoStyled src="/logo.svg" className="App-logo" alt="logo" width={width}/>
        </LinkStyled>
    </LogoContainer>
);

Logo.propTypes = {
    width: PropTypes.number,
}

export default Logo;