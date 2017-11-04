import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: 'flex-start';
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  position: relative;
  width:${({ width = '100px' }) => width};
  margin-top: ${({ top = '0px' }) => top};
  padding: 20px;
  min-height:${({ height = '0px' }) => height};
  border-radius: 4px;
  background-color:white;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
`;

export default Container;