import React from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const AppStyled = styled.div`
  background-color: rgb(250,250,250);
  min-height: 100vh;
`;

const App = props => (
  <MuiThemeProvider>
    <AppStyled>
      {props.children}
    </AppStyled>
  </MuiThemeProvider>
)


export default App;
