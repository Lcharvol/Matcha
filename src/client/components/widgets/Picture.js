import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStateHandlers } from 'recompose';

const PictureContainer = styled.div`
  display:flex;
  flex-direction:column;
  position:relative;
  justify-content: center;
  align-items: flex-start;
  width:430px;
  @media (max-width: 2000px) {
      width:25%;
  }
  @media (max-width: 1500px) {
      width:33.3%;
  }
  @media (max-width: 1000px) {
      width:50%;
  }
  @media (max-width: 500px) {
      width:100%;
  }
  margin:0px;
  z-index:0;
  &:hover {
      transition: all 0.3s;
      box-shadow: 0 7px 15px rgba(0,0,0,0.17), 0 1px 2px rgba(0,0,0,0.17);
  }
`;

const PictureStyled = styled.div`
  position:relative;
  width:100%;
  min-height:300px;
  background-color:rgb(225,225,225);
  background-image:${({ picture }) => `url('${picture}.jpg')`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor:pointer;
`;


const Shadow = styled.div`
  position:relative;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color:rgba(0,0,0,0.3);
  min-width:100%;
  min-height:300px;
  z-index:0;
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
  background-color: rgba(0,0,0,0.7);
  z-index:1000;
`;

const PictureSightedStyled = styled.div`
  width:100%;
  max-width:800px;
  height:100%;
  background-image: ${({ picture  }) => `url(${picture}.jpg)`};
  background-size: cover;
  background-position: center;
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
`;

const PictureSighted = ({ picture, closePicture }) => (
  <PictureSightedContainer onClick={closePicture}>
    <Wrapper>
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
  <PictureContainer>
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
  </PictureContainer>
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
