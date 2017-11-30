import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { map, isNil, upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';

import { Avatar, Spacer, Tag, Score, Picture, Throphy, Header } from '../widgets';
import { reqMe } from '../../request';
import { getUser } from '../../selectors/user';

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
    background-color:rgb(240,240,240);
`;

const ProfilContainer = styled.div`
    width:100%;
    margin-top:65px;
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
    justify-content: center;
    align-items: center;
    text-decoration: none;
    max-width:100px;
    color:#EA5555;
    margin:auto;
    margin-top:10px;
    &:hover {
        text-decoration:none;
        color:#EA5555;
    }
`;

const Pictures = styled.div`
    display:flex;
    width:100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
`;

const ProfilHeader = styled.div`
    display:flex;
    flex-direction:wrap;
    justify-content: center;
    align-items: center;
    width:100%;
    background:${({ background }) => `url(${background}.jpg)`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const HeaderContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:1;
    min-height:300px;
`;

const Name = styled.p`
    font-size: 1.3em;
    color:white;
    margin-top:20px;
`;

const FakeContent = styled.div`
    display:flex;
    width:100%;
    min-height:45px;
    border-radius:3px;
    background-color:rgb(235,235,235);
`;

class Profil extends Component {
  render() {
    const { user } = this.props;
    if(!user) return null;
    return (
        <MainContainer>
            <Header displaySearchBar={false}/>
            <ProfilContainer>
                <ProfilHeader background={user.pictures[0]}>
                    <HeaderContainer>
                        <Avatar user={user}/>
                        <Name>{`${upperFirst(user.firstname)} ${upperFirst(user.lastname)}`}</Name>
                    </HeaderContainer>
                </ProfilHeader>
                <ProfilInfo>
                    <InlineBlock>
                        <LinkStyled to={`/editprofil`}>
                            <Icon className="fa fa-pencil" aria-hidden="true"/>
                            <Text>Edit my profil</Text>
                        </LinkStyled>
                    </InlineBlock>
                    <Title>I'im looking for</Title>
                    <InlineBlock>
                        {user.sexualorientation === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
                    </InlineBlock>
                    <Title>My biography</Title>
                    <InlineBlock>
                        <Text>{user.bio}</Text>
                        {!user.bio && <FakeContent/>}
                    </InlineBlock>
                    <Title>Interests</Title>
                    <InlineBlock>
                        {map(user.interest, (tag, index) => <Tag key={`${tag}${index}`} name={tag}/>)}
                    </InlineBlock>
                    <Title>My pictures</Title>
                    <InlineBlock>
                        <Pictures>
                            {map(user.pictures, (picture, index) => <Picture key={`${picture}${index})}`} picture={picture} />)}
                        </Pictures>
                    </InlineBlock>
                </ProfilInfo>
            </ProfilContainer>
        </MainContainer>
    );
  }
}

const actions = {};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
