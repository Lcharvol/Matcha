import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { map, isNil, upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Spacer, Tag, Score, Picture, Throphy, Header } from '../widgets';
import styled from 'styled-components';
import { reqMe } from '../../request';
import { Link } from 'react-router'

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
    right:20px;
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
  state = {
    user: '',
  }

  async componentWillMount() {
    const { details: user } = await reqMe();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if(!user) return null;
    const { photo_1, photo_2, photo_3, photo_4, photo_5 } = user;
    user.picture = [photo_1, photo_2, photo_3, photo_4, photo_5].filter(picture => picture !== 'undefined' && picture !== 'null' && !isNil(picture));
    return (
        <MainContainer>
            <Header displaySearchBar={false}/>
            <ProfilContainer>
                <ProfilHeader background={user.picture[0]}>
                    <HeaderContainer>
                        <Avatar user={user}/>
                        <Name>{`${upperFirst(user.firstname)} ${upperFirst(user.lastname)}`}</Name>
                    </HeaderContainer>
                </ProfilHeader>
                <ProfilInfo>
                    <InlineBlock>
                        <LinkStyled to={`/profil`}>
                            <Icon className="fa fa-pencil" aria-hidden="true"/>
                        </LinkStyled>
                    </InlineBlock>
                    <Title>I'imlooking for</Title>
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
                        {user.interest && map(user.interest.split(','), (tag, index) => <Tag key={`${tag}${index}`} name={tag}/>)}
                    </InlineBlock>
                    <Title>My pictures</Title>
                    <InlineBlock>
                        <Pictures>
                            {map(user.picture, (picture, index) => <Picture key={`${picture}${index})}`} picture={picture} />)}
                        </Pictures>
                    </InlineBlock>
                </ProfilInfo>
            </ProfilContainer>
        </MainContainer>
    );
  }
}

const actions = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
