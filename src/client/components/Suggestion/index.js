import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withHandlers, compose, withStateHandlers } from 'recompose';
import { Container, Avatar } from '../widgets';
import Profil from './Profil';

const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px;
    justify-content: 'flex-start';
    padding: 25px;
    min-height:${({ height = '0px' }) => height};
    border-radius: 4px;
    background-color:white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14);
`;

const ProfilContainer = styled.div`
    display: flex;
    flex-direction:row;
    width:100%;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display:flex;
    height:200px;
    flex:1;
    overflow: hidden;
`;

const VoteContainer = styled.div` 
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    min-height:50px;
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

const Suggestion = ({ user }) => (
    <ContainerStyled>
        <ProfilContainer>
            <Content>
                <Profil />
            </Content>
        </ProfilContainer>
        <VoteContainer>
            <IconStyled color="#EA5555" className="fa fa-check" aria-hidden="true"/>
            <IconStyled color="#2ecc71" className="fa fa-times" aria-hidden="true"/>
        </VoteContainer>
    </ContainerStyled>
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