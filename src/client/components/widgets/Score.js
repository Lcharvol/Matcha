import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  width:100%;
  min-height:30px;
`;

const ScoreBar = styled.div`
  display:flex;
  width:90%;
  height:17px;
  border-radius:100px;
  background-color: rgb(250,250,250);
  box-shadow: inset 7px 6px 15px rgba(25, 25, 25, 0.05);
  overflow:hidden;
`;

const ScoreProgress= styled.div`
  display:flex;
  justify-content: flex-end;
  align-items: center;
  width: ${({ score = 0 }) => `${score}%`};
  height:100%;
  background-color:#EA5555;
  background: linear-gradient( 90deg, rgba(244, 92, 67, 1) 0%, #EA5555  100%);
  border-radius:100px;
`;

const ScoreText = styled.div`
  margin-top:25px;
  font-size:2em;
  color:#EA5555;
`;

const ScoreTick = styled.div`
  width:11px;
  height:11px;
  margin:5px;
  border-radius: 100px;
  background-color: white;
`;

const Score = ({ score }) => (
  <ScoreContainer>
    <ScoreBar>
      <ScoreProgress score={score}>
        <ScoreTick />
      </ScoreProgress>
    </ScoreBar>
    <ScoreText>
      {score} / 100
    </ScoreText>
  </ScoreContainer>
);

Score.propTypes = {
  score: PropTypes.number.isRequired,
}

export default Score;