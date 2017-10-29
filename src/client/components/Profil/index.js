import React from 'react';
import { bindActionCreators } from 'redux';
import { map } from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Avatar, Spacer, Tag } from '../widgets';
import styled from 'styled-components';
import { Link } from 'react-router'

const ContainerStyled = styled.div`
    display: flex;
`;

const ProfilContainer = styled.div`
    display: flex;
    margin: 15px;
    justify-content: 'flex-start';
    padding: 20px;
    min-height:${({ height = '0px' }) => height};
    border-radius: 4px;
    background-color:white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14);
`;

const ProfilInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 10px;
    padding-right: 10px;
    color:rgb(25,25,25);
`;

const Icon = styled.i`
    color:#EA5555;
    margin-left:15px;
    font-size: 1.5em;
    cursor: pointer;
    &:hover {
        transition: all 60ms ease;
        opacity: .85;
    }
`;

const InlineBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction:row;
    width:100%;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom:25px;
`;

const Text = styled.p`
    margin: 0;
`;

const Title = styled.p`
    margin: 0;
    margin-bottom: 15px;
    color:#EA5555;
`;

const LinkStyled = styled(Link)`
    flex:1;
    display:flex;
    justify-content: flex-end;
    text-decoration: none;
`;

const Profil = ({ user = {} }) => (
    <ContainerStyled>
        <ProfilContainer>
            <Avatar avatar={user.avatar}/>
            <Spacer size={20}/>
            <ProfilInfo>
                <InlineBlock>
                    <Text>{user.firstName} {user.lastName}</Text>
                    {user.sexe === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
                    <LinkStyled to={`/profil`}>
                        <Icon className="fa fa-pencil" aria-hidden="true"/>
                    </LinkStyled>
                </InlineBlock>
                <InlineBlock>
                    <Text>Je recherche: </Text>
                    {user.sexualOrientation === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
                </InlineBlock>
                <Title>Ma bio</Title>
                <InlineBlock>
                    <Text>{user.bio}</Text>
                </InlineBlock>
                <InlineBlock>
                    <Title>Interêts: </Title>
                    {map(tag => <Tag name={tag}/> , user.interest)}
                </InlineBlock>
            </ProfilInfo>
        </ProfilContainer>
    </ContainerStyled>
);

Profil.propTypes = {
    user: PropTypes.object.isRequired,
}

const actions = {};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profil);