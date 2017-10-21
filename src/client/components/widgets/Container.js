import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  flex-direction: column;
  position: relative;
  min-width: 300px;
  max-width:${({ width = '500px' }) => width};
  top: ${({ top = '0px' }) => top};
  padding: 20px;
  border-radius: 4px;
  background-color:white;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
`;

export default Container;