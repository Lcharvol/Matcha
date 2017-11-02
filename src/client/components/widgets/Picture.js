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

const PictureSightedContainer = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  display:flex;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(0,0,0,0.4);
  z-index:10;
`;

const PictureSightedStyled = styled.div`
  width:90%;
  height:90%;
  background-image: ${({ picture  }) => `url(${picture})`};
  background-position:center center;
  background-repeat: no-repeat;
`;

const CloseIcon = styled.i`
    position: absolute;
    align-self:flex-start;
    right:20px;
    top:30%;
    cursor: pointer;
    color:#EA5555;
    font-size:2em;
`;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width:100%;
    height:40%;
    min-height:400px;
    background-color:rgb(250,250,250);
    padding:25px;
`;

const PictureSighted = ({ picture, closePicture }) => (
  <PictureSightedContainer>
    <Wrapper>
      <CloseIcon className="fa fa-times" aria-hidden="true" onClick={closePicture} />
      <PictureSightedStyled picture={picture}/>
    </Wrapper>
  </PictureSightedContainer>
);

PictureSighted.propTypes = {
  picture: PropTypes.string.isRequired,
  closePicture: PropTypes.func.isRequired,
}

const Picture = ({
  picture,
  handleMouseEnter,
  handleMouseLeave,
  openPicture,
  closePicture,
  isHover,
  isOpen,
}) => (
  <div>
    <PictureStyled
      picture={picture}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHover &&
        <Shadow onClick={openPicture}>
          <ShadowIcon
            className="fa fa-search"
            aria-hidden="true"
          />
        </Shadow>
      }
    </PictureStyled>
    {isOpen && <PictureSighted picture={picture} closePicture={closePicture}/>}
  </div>
);

Picture.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  openPicture: PropTypes.func.isRequired,
  closePicture: PropTypes.func.isRequired,
  isHover: PropTypes.bool,
  picture: PropTypes.string.isRequired,
}

const enhance = withStateHandlers(
  {
    isHover: false,
    isOpen: false,
  },
  {
    handleMouseLeave: () => () => ({ isHover: false }),
    handleMouseEnter: () => () => ({ isHover: true }),
    openPicture: () => () => ({ isOpen: true }),
    closePicture: () => () => ({ isOpen: false }),
  },
);

export default enhance(Picture);