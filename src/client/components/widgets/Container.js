import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: 'flex-start';
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  position: relative;
  width:${({ width = '100px' }) => width};
  top: ${({ top = '0px' }) => top};
  padding: 20px;
  min-height:${({ height = '0px' }) => height};
  border-radius: 4px;
  background-color:rgb(250,250,250);
  box-shadow: 10px 10px 30px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14);
`;

export default Container;