import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: 'flex-start';
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  position: relative;
  width:${({ width = '500px' }) => width};
  top: ${({ top = '0px' }) => top};
  padding: 20px;
  min-height:${({ height = '0px' }) => height};
  border-radius: 4px;
  background-color:white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14);
`;

export default Container;