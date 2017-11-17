import styled from 'styled-components';

const InputButton = styled.input`
    padding: 12px 12px;
    max-width:120px;
    cursor: pointer;
    user-select: none;
    transition: all 60ms ease-in-out;
    text-align: center;
    white-space: nowrap;
    text-decoration: none !important;
    text-transform: none;
    text-transform: capitalize;
    color: #fff;
    border: 0 none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.3;
    -webkit-appearance: none;
    -moz-appearance:    none;
    appearance:         none;
    justify-content: center;
    align-items: center;
    flex: 0 0 160px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
    color: #FFFFFF;
    background: linear-gradient( 160deg, rgba(244, 92, 67, 0.7) -200%, #EA5555  200%);
    opacity: .95;
    &:hover {
     transition: all 60ms ease;
     opacity: .8;
    }
    &:active {
     transition: all 60ms ease;
      box-shadow: inset 5px 5px 2px rgba(0, 0, 0, 0.2);
    }
`;

export default InputButton;