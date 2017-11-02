import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStateHandlers } from 'recompose';

const PictureStyled = styled.div`
    background-image: ${({ picture  }) => `url(${picture})`};
    background-position:center center;
    background-size: auto 100%;
    width: 150px;
    height:150px;
    margin:7px;
    border-radius:3px;
    background-repeat: no-repeat;
    background-color: rgb(250,250,250);
    cursor: pointer;
    overflow: hidden;
    z-index:1;
    &:hover {
        transition: all 0.3s;
        box-shadow: 0 7px 15px rgba(0,0,0,0.17), 0 1px 2px rgba(0,0,0,0.17);
    }
`;

const Shadow = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  background-color:rgba(0,0,0,0.3);
  min-width:100%;
  min-height:100%;
  z-index:2;
`;

const ShadowIcon  = styled.i`
  color:rgba(255,255,255,0.7);
  font-size:3em;
`;

const Picture = ({
  picture,
  handleMouseEnter,
  handleMouseLeave,
  isHover,
}) => (
  <PictureStyled
    picture={picture}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    {isHover &&
      <Shadow>
        <ShadowIcon className="fa fa-search" aria-hidden="true"></ShadowIcon>
      </Shadow>
    }
  </PictureStyled>
);

Picture.propTypes = {
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  isHover: PropTypes.bool,
  picture: PropTypes.string.isRequired,
}

const enhance = withStateHandlers(
  {
    isHover: false,
  },
  {
    handleMouseLeave: () => () => ({ isHover: false }),
    handleMouseEnter: () => () => ({ isHover: true }),
  },
);

export default enhance(Picture);