import React from 'react';
import styled from 'styled-components';
import { Container, Header } from '../widgets';
import Profil from '../Profil';
import Suggestion from '../Suggestion';

const Content = styled.div`
    display: grid;
    grid-auto-columns: minmax(70px, auto);
    grid-auto-rows: minmax(70px, auto);
    grid-template-areas: 'profil' 'suggestion';
    @media (min-width: 1000px) {
      grid-template-areas: 'profil suggestion';
    }
`;

const Home = () => (
    <div>
        <Header />
        <Content>
            <Profil style={{ gridArea: 'profil'}}/>
            <Suggestion style={{ gridArea: 'suggestion'}}/>
        </Content>
    </div>
);

export default Home;