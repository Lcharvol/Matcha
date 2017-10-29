import React from 'react';
import styled from 'styled-components';


const AppStyled = styled.div`
  background-color: rgb(250,250,250);
  min-height: 100vh;
`;

const App = props => (
    <AppStyled>
      {props.children}
    </AppStyled>
)


export default App;
