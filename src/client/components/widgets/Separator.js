import React from 'react';
import styled from 'styled-components';

const SeparatorStyled = styled.div`
  width:95%;
  margin:auto;
  margin-top:25px;
  margin-bottom:25px;
  height:1px;
  border-radius:100px;
  background-color:rgb(200,200,200);
`;

const Separator = () => (
  <SeparatorStyled />
);

export default Separator;