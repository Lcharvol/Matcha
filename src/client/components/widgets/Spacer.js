import styled from 'styled-components';

const margin = ({ size = 10 }) => `${size}px`;
const Spacer = styled.span`
  margin-left: ${margin};
  margin-right: ${margin};
`;

export default Spacer;