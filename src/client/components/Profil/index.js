import React from 'react';
import { bindActionCreators } from 'redux';
import { map } from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Spacer, Tag, Score, Picture, Throphy } from '../widgets';
import styled from 'styled-components';
import { Link } from 'react-router'

const ProfilContainer = styled.div`
    width:100%;
    margin-top:10px;
    background-color:white;
    border-radius:0px;
`;

const ProfilInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 25px;
    padding-right: 25px;
    color:rgb(25,25,25);
`;

const Icon = styled.i`
    color: rgba(244, 88, 65, 0.8);
    margin-top:15px;
    margin-right:15px;
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

const Pictures = styled.div`
    display:flex;
    width:100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const Throphys = styled.div`
    display:flex;
    width:100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
`;

const Header = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const Name = styled.p`
    font-size: 1.3em;
    color:rgb(25,25,25);
`;

const Profil = ({ user = {} }) => (
    <ProfilContainer>
        <LinkStyled to={`/profil`}>
            <Icon className="fa fa-pencil" aria-hidden="true"/>
        </LinkStyled>
        <Header>
            <Avatar user={user}/>
            <Spacer size={20}/>
            <Name>{`${user.firstName} ${user.lastName}`}</Name>
                {user.sexe === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
        </Header>
        <ProfilInfo>
            <InlineBlock>
                <Text>Je recherche: </Text>
                {user.sexualOrientation === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
            </InlineBlock>
            <Title>Ma bio</Title>
            <InlineBlock>
                <Text>{user.bio}</Text>
            </InlineBlock>
            <Title>Interêts: </Title>
            <InlineBlock>
                {map(tag => <Tag key={tag} name={tag}/> , user.interest)}
            </InlineBlock>
            <Title>Mes Photos: </Title>
            <InlineBlock>
                <Pictures>
                    {map(picture => <Picture key={picture} picture={picture} /> , user.pictures)}
                </Pictures>
            </InlineBlock>
            <Title>Mes Throphés: </Title>
            <InlineBlock>
                <Throphys>
                    {map(throphy => <Throphy key={throphy.id} throphy={throphy} /> , user.throphys)}
                </Throphys>
            </InlineBlock>
            <Title>Mon Score: </Title>
            <InlineBlock>
                <Score score={user.score}/>
            </InlineBlock>
        </ProfilInfo>
    </ProfilContainer>
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