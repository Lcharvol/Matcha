import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withHandlers, compose, withStateHandlers } from 'recompose';
import { Container, Avatar } from '../widgets';
import Profil from './Profil';

const MainContent = styled.div`
    display:flex;
    flex:1;
    width:100%;
`;

const ContainerStyled = styled(Container)`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-top:25px;
    max-height:500px;
    background-color:white;
`;

const ProfilContainer = styled.div`
    display: flex;
    flex-direction:row;
    width:100%;
    margin-top:15px;
    justify-content: center;
    align-items: center;
`;


const VoteContainer = styled.div` 
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const IconStyled = styled.i`
    cursor:pointer;
    color:${({ color = '' }) => color};
    font-size:2.5em;
    max-width:50px;
    margin-left:20px;
    margin-right:20px;
    &:hover {
        transition: all 60ms ease;
        opacity: .85;
    }
`;

const MatchPicture = styled.div`
    display:flex;
    border-radius:3px;
    background-image: ${({ avatar  }) => `url(${avatar})`};
    background-position:center center;
    background-size: 100%;
    width:425px;
    height:400px;
`;

const Suggestion = ({ users }) => (
    <MainContent>
        <ContainerStyled width="450px">
            <ProfilContainer>
                <MatchPicture avatar={users[0].avatar}/>
            </ProfilContainer>
            <VoteContainer>
                <IconStyled color="#2ecc71" className="fa fa-check" aria-hidden="true"/>
                <IconStyled color="#EA5555" className="fa fa-times" aria-hidden="true"/>
            </VoteContainer>
        </ContainerStyled>
    </MainContent>
);

Suggestion.propTypes = {
    users: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    users: state.users,
});
  
const actions = {
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
        {
          userIdDisplayed: '',
        },
        {
          nextUser: () => () => ({ isModalOpen: true }),
          prevUser: () => () => ({ isModalOpen: false }),
        },
      ),
);

export default enhance(Suggestion);