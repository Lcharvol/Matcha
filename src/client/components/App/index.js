import React from 'react';
import styled from 'styled-components';


const AppStyled = styled.div`
  position:relative;
  background-color: rgb(230,230,230);
  background: linear-gradient( 160deg, rgba(244, 92, 67, 0.75) 0%, #EA5555  120%);
  bottom:0px;
  font-family: 'PT Sans', sans-serif;
  overflow-x: hidden;
  `;

const App = props => (
    <AppStyled>
      {props.children}
    </AppStyled>
)


export default App;
