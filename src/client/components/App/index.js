import React from 'react';
import styled from 'styled-components';


const AppStyled = styled.div`
  background-color: rgb(230,230,230);
  background: linear-gradient( 160deg, rgba(244, 92, 67, 0.75) 0%, #EA5555  120%);
  min-height: 100vh;
  bottom:0px;
  font-family: 'Lato', sans-serif;  
`;

const App = props => (
    <AppStyled>
      {props.children}
    </AppStyled>
)


export default App;
