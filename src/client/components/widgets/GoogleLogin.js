import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:50px;
    border-radius:3px;
    background: linear-gradient( 160deg, #ea5e53 0%, #e74c3c  100%);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
    margin:auto;
    cursor: pointer;
    transition: all 60ms ease;
    &:hover {
        transition: all 60ms ease;
        width:95%;
    }
`;

const GoogleLoginContainer = styled.div`
    display:flex;
    margin-top:25px;
    width:390px;
`;

const Logo = styled.i`
    color:white;
    font-size:1.3em;
    margin-right:15px;
`;

const Text = styled.p`
    color:white;
`;

const GoogleLogin = () => (
    <GoogleLoginContainer>
        <Button>
            <Logo className="fa fa-google" aria-hidden="true" />
            <Text>Sign in with Google</Text>
        </Button>
    </GoogleLoginContainer>
);

export default GoogleLogin;