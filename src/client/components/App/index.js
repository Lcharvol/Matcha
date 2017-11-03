import React from 'react';
import styled from 'styled-components';


const AppStyled = styled.div`
  background-color: rgb(230,230,230);
  background: linear-gradient( 180deg, rgba(244, 92, 67, 1) 0%, #EA5555  100%);
  min-height: 100vh;
`;

const App = props => (
    <AppStyled>
      {props.children}
    </AppStyled>
)


export default App;
