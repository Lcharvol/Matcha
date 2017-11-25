import React from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty, isNil } from 'lodash';
import { compose, lifecycle, withState, withStateHandlers } from 'recompose';
import styled from 'styled-components';
import { Header, Avatar, Picture, Tag } from '../widgets';
import { Link } from 'react-router'
import { reqGetUser, reqGetLike } from '../../request';

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

const LikeButton = styled.i`
    font-size:2em;
    color: #EA5555;
    cursor:pointer;
`;

const ProfilContainer = styled.div`
    width:100%;
    margin-top:65px;
    background-color:white;
    border-radius:0px;
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

const ProfilHeader = styled.div`
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

const ProfilInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 25px;
    padding-right: 25px;
    color:rgb(25,25,25);
`;

const Pictures = styled.div`
    display:flex;
    width:100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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
                <LinkStyled to={`/profil`}>
                    <Icon className="fa fa-pencil" aria-hidden="true"/>
                </LinkStyled>
                <ProfilHeader>
                    <Avatar user={user}/>
                    <Name>{`${user.firstname} ${user.lastname}`}</Name>
                    {!isEmpty(statusLike) && <LikeButton
                        className={`fa fa-thumbs-${statusLike === 'like' ? 'up' : 'down'}`}
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
                    {user.sexe === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
                </ProfilHeader>
                <ProfilInfo>
                    <InlineBlock>
                        <Text>Je recherche </Text>
                        {user.sexualorientation === 'man' ? <Icon className="fa fa-mars" aria-hidden="true"/> : <Icon className="fa fa-venus" aria-hidden="true"/>}
                    </InlineBlock>
                    <Title>Ma bio</Title>
                    <InlineBlock>
                        <Text>{user.bio}</Text>
                    </InlineBlock>
                    <Title>Interêts: </Title>
                    <InlineBlock>
                        {map(user.interest.split(','), (tag, index) => <Tag key={`${tag}${index}`} name={tag}/>)}
                    </InlineBlock>
                    <Title>Mes Photos: </Title>
                    <InlineBlock>
                        <Pictures>
                            {map(pictures, (picture, index) => <Picture key={`${picture}${index})}`} picture={picture} />)}
                        </Pictures>
                    </InlineBlock>
                </ProfilInfo>
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
                reqGetLike(user.id)
                .then(res => {
										reqGetLike(user.id)
										.then(res => {
											this.props.handleStatusLike(res);
										})
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