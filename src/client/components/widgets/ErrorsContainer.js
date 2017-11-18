import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    min-height:40px;
    margin-bottom:25px;
`;

const TextError = styled.p`
    color: #EA5555;
    margin:0;
`;

const ErrorsContainer = ({ errors = '' }) => (
    <Container>
        <TextError>
            {errors}
        </TextError>
    </Container>
);

ErrorsContainer.propTypes = {
    errors: PropTypes.string.isRequired,
}

export default ErrorsContainer;