import React from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty, isNil, upperFirst } from 'lodash';
import { compose, lifecycle, withState, withStateHandlers } from 'recompose';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getUser } from '../../selectors/user';
import { Header, Avatar, Picture, Tag } from '../widgets';
import { reqGetUser, reqGetLike, reqGetLikeStatus, reqUpdateUser, reqMe } from '../../request';

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
    margin-right:15px;
    font-size: 2em;
    margin-left: 10px;
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
    margin-top:20px;
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
    justify-content: flex-start;
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

const LostLink = styled(Link)`
margin:auto;
display:auto;
`;

const handleReportFake = () => {
  alert('Thank you user reported');
};

const User = ({ me, user, statusLike, handleStatusLike }) => {
    if (isEmpty(user)) {
        return null;
    }
    return (
        <MainContainer>
            <Header
                displaySearchBar={false}
            />
            <ProfilContainer>
                <ProfilHeader background={user.pictures[0]}>
                    <HeaderContainer>
                        {!isEmpty(statusLike) && me.profile_picture !== '/uploads/null' && <LikeButton
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
                        <Name>{`${upperFirst(user.firstname)} ${upperFirst(user.lastname)}`}</Name>
                    </HeaderContainer>
                    <HeaderContainer>
                        <BlockButton className="fa fa-times" aria-hidden="true" onClick={() => reqUpdateUser({ blocked: user.id })}/>
                    </HeaderContainer>
                </ProfilHeader>
                <ProfilInfo>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Looking for</Title>
                    <InlineBlock>
                        {user.sexualorientation === 'man' && <Icon className="fa fa-male" color="#3498db" aria-hidden="true"/>}
                        {user.sexualorientation === 'woman' && <Icon className="fa fa-female" color="#EA5555" aria-hidden="true"/>}
                        {user.sexualorientation === 'bisexual' &&
                        (
                            <div>
                                <Icon className="fa fa-male" color="#3498db" aria-hidden="true"/>
                                <Icon className="fa fa-female" color="#EA5555" aria-hidden="true"/>
                            </div>
                        )
                        }
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>City</Title>
                    <InlineBlock>
                        <Text>{user.city}</Text>
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Zip Code</Title>
                    <InlineBlock>
                        <Text>{user.postal_code}</Text>
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}>Biography</Title>
                    <InlineBlock>
                        <Text>{user.bio}</Text>
                        {!user.bio && <FakeContent/>}
                    </InlineBlock>
                    <Title color={user.sexe === 'woman' ? '#EA5555' : '#3498db'}> Interests</Title>
                    <InlineBlock>
                        {map(user.interest, (tag, index) => <Tag key={`${tag}${index}`} name={tag}/>)}
                    </InlineBlock>
                </ProfilInfo>
                <Pictures>
                    {map(user.pictures, (picture, index) => <Picture key={`${picture}${index})}`} picture={picture} />)}
                </Pictures>
                <LostLink onClick={handleReportFake}>Report User</LostLink>
            </ProfilContainer>
        </MainContainer>
    )
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    me: PropTypes.object,
}

const mapStateToProps = state => ({
    me: getUser(state),
});

const enhance = compose(
    connect(mapStateToProps),
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
        componentDidMount() {
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
                console.log('zbob', err);
            });
        },
    }),
);

export default enhance(User);
