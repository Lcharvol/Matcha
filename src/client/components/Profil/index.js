import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { map, isNil, upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import axios from 'axios';
import FormData from 'form-data';

import { Avatar, Spacer, Tag, Score, Picture, Throphy, Header } from '../widgets';
import { reqMe, reqAddImg } from '../../request';
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

const imgToString = ['profile_picture', 'pic1', 'pic2', 'pic3', 'pic4'];
class Profil extends Component {

state = {
    files: [null,null,null,null,null],
}

handleFileUpload(e, id) {
    this.state.files[id]= e.target.files[0];
    this.setState({ files: this.state.files });
}

async handleChangeFile(id) {
    if (isNil(this.state.files[id])) {
        console.log('pas de fichier')
    }
    else {
      const form = new FormData();
      form.append(imgToString[id], this.state.files[id], this.state.files[id].name);
      const matchaToken = localStorage.getItem('matchaToken');
      axios.post(`http://127.0.0.1:3004/api/user/add_img?matchaToken=${matchaToken}`, form, {
        headers: { 'content-type': 'multipart/form-data' }
      }).then(result => {
        location.reload();
      }).catch(err => alert('Failed to upload img'));
    }
}

  render() {
    const { user } = this.props;
    const { files } = this.state;
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
                    </InlineBlock>
                    <InlineBlock>
                        <LinkStyled to={`/editprofil`}>
                            <Icon className="fa fa-pencil" aria-hidden="true"/>
                            <Text>Edit my profil</Text>
                        </LinkStyled>
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>I'im looking for</Title>
                    <InlineBlock>
                        {user.sexualorientation === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>My biography</Title>
                    <InlineBlock>
                        <Text>{user.bio}</Text>
                        {!user.bio && <FakeContent/>}
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>City</Title>
                    <InlineBlock>
                        <Text>{user.city}</Text>
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Zip Code</Title>
                    <InlineBlock>
                        <Text>{user.postal_code}</Text>
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Interests</Title>
                    <InlineBlock>
                        {map(user.interest, (tag, index) => <Tag key={`${tag}${index}`} name={tag}/>)}
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Change pictures</Title>
                    <InlineBlock>
                        <InlineBlock>
                            <Text>Profil picture</Text>
                            <Spacer />
                            <input type="file" accept="image/*" onChange={event => this.handleFileUpload(event, 0)} />
                            <button onClick={() => this.handleChangeFile(0)}>Change</button>
                        </InlineBlock>
                        <InlineBlock>
                            <Text>Picture 1</Text>
                            <Spacer />
                            <input type="file" accept="image/*" onChange={event => this.handleFileUpload(event, 1)} />
                            <button onClick={() => this.handleChangeFile(1)}>Change</button>
                        </InlineBlock>
                        <InlineBlock>
                            <Text>Picture 2</Text>
                            <Spacer />
                            <input type="file" accept="image/*" onChange={event => this.handleFileUpload(event, 2)} />
                            <button onClick={() => this.handleChangeFile(2)}>Change</button>
                        </InlineBlock>
                        <InlineBlock>
                            <Text>Picture 3</Text>
                            <Spacer />
                            <input type="file" accept="image/*" onChange={event => this.handleFileUpload(event, 3)} />
                            <button onClick={() => this.handleChangeFile(3)}>Change</button>
                        </InlineBlock>
                        <InlineBlock>
                            <Text>Picture 4</Text>
                            <Spacer />
                            <input type="file" accept="image/*" onChange={event => this.handleFileUpload(event, 4)} />
                            <button onClick={() => this.handleChangeFile(4)}>Change</button>
                        </InlineBlock>
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>My pictures</Title>
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
