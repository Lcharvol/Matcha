import React from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty, isNil } from 'lodash';
import { compose, lifecycle, withState, withStateHandlers } from 'recompose';
import styled from 'styled-components';
import { Header, Avatar, Picture, Tag } from '../widgets';
import { Link } from 'react-router'
import { reqGetUser, reqGetLike, reqGetLikeStatus, reqUpdateUser } from '../../request';

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
    background-color:rgb(240,240,240);
`;

const Content = styled.div`
    display:flex;
    flex-direction: column;
    margin-top:95px;
    background-color:white;
    height:100%;
`;

const FakeContent = styled.div`
    display:flex;
    width:100%;
    min-height:45px;
    border-radius:3px;
    background-color:rgb(235,235,235);
`;

const HeaderContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:1;
    min-height:300px;
`;

const LikeButton = styled.i`
    font-size:5em;
    color: ${({ color  }) => color};
    cursor:pointer;
    transition: all 260ms;
    &:hover {
        font-size:5.5em;
    }
`;

const ProfilContainer = styled.div`
    width:100%;
    margin-top:65px;
    background-color:white;
    border-radius:0px;
`;

const Icon = styled.i`
    margin-top:15px;
    margin-right:15px;
    font-size: 2em;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
        transition: all 60ms ease;
        opacity: .85;
    }
    color:${({ color }) => color};
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
    color:${({ color }) => color};
`;

const LinkStyled = styled(Link)`
    flex:1;
    display:flex;
    justify-content: flex-end;
    text-decoration: none;
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

const Name = styled.p`
    font-size: 1.3em;
    color:white;
`;

const ProfilInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 25px;
    padding-right: 25px;
    color:rgb(25,25,25);
    padding-top:25px;
`;

const Pictures = styled.div`
    display:flex;
    flex:1;
    flex-wrap: wrap;
    width:100%;
    justify-content: center;
    align-items: flex-start;
    margin-top:65px;
    margin-bottom:15px;
    z-index:10;
`;

const BlockButton = styled.i`
    color:#e74c3c;
    cursor:pointer;
    font-size:4em;
    transition: all 460ms ease;
    &:hover {
        transform: rotate(90deg);
    }
`;

const User = ({ user, statusLike, handleStatusLike }) => {
    if (isEmpty(user)) {
        return null;
    }
    const { photo_1, photo_2, photo_3, photo_4, photo_5 } = user;
    const pictures = [photo_1, photo_2, photo_3, photo_4, photo_5].filter(picture => picture !== 'undefined' && !isNil(picture));
    return (
        <MainContainer>
            <Header
                displaySearchBar={false}
            />
            <ProfilContainer>
                <ProfilHeader background={pictures[0]}>
                    <HeaderContainer>
                        {!isEmpty(statusLike) && <LikeButton
                            color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}
                            className={`fa fa-heart${statusLike === 'like' ? '' : '-o'}`}
                            aria-hidden="true"
                            onClick={
                                () => {
                                    reqGetLike(user.id)
                                    .then(res => {
                                        handleStatusLike(res);
                                    })
                                    .catch(err => {
                                        // redirection sur le history
                                        console.log(err.details);
                                    });
                                }
                            }
                        />}
                    </HeaderContainer>
                    <HeaderContainer>
                        <Avatar user={user}/>
                        <Name>{`${user.firstname} ${user.lastname}`}</Name>
                    </HeaderContainer>
                    <HeaderContainer>
                        <BlockButton className="fa fa-times" aria-hidden="true" onClick={() => reqUpdateUser({ blocked: user.id })}/>
                    </HeaderContainer>
                </ProfilHeader>
                <ProfilInfo>
                    <InlineBlock>
                        <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Looking for</Title>
                        {user.sexualorientation === 'man' ? <Icon className="fa fa-male" color="#3498db" aria-hidden="true"/> : <Icon className="fa fa-female" color="#EA5555" aria-hidden="true"/>}
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Biography</Title>
                    <InlineBlock>
                        <Text>{user.bio}</Text>
                        {!user.bio && <FakeContent/>}
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}> Interests</Title>
                    <InlineBlock>
                        {map(user.interest.split(','), (tag, index) => <Tag key={`${tag}${index}`} name={tag}/>)}
                    </InlineBlock>
                </ProfilInfo>
                <Pictures>
                    {map(pictures, (picture, index) => <Picture key={`${picture}${index})}`} picture={picture} />)}
                </Pictures>
            </ProfilContainer>
        </MainContainer>
    )
};

User.propTypes = {
    user: PropTypes.object.isRequired,
}

const enhance = compose(
    withState('user', 'loadUser', {}),
    withStateHandlers(
        {
            statusLike: '',
        },
        {
            handleStatusLike: () => (statusLike) => ({ statusLike }),
        },
    ),
    lifecycle({
        componentWillMount() {
            reqGetUser(Number(window.location.pathname.substr(6)))
            .then(user => {
              reqGetLikeStatus(user.id)
                .then(res => {
											this.props.handleStatusLike(res);
                  })
                this.props.loadUser(user);
            })
            .catch(err => {
                // redirection sur le history
                console.log(err.details);
            });
        },
    }),
);

export default enhance(User);
