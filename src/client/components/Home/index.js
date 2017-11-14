import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../selectors/user';
import { Header, Container, Avatar } from '../widgets';
import Profil from '../Profil';
import Suggestion from '../Suggestion';

const Content = styled.div`
    display:flex;
    flex-wrap: wrap;
    width:100%;
    justify-content: center;
    align-items: center
`;

const Icon = styled.i`
    display:flex;
    justify-content: center;
    align-items: center;
    color:#EA5555;
    font-size:2.7em;
    margin:10px;
`;

const Link = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    min-width:40%;
`;

const Name = styled.p`
    color:#EA5555;
`;

const Home = ({ user }) => (
    <div>
        <Header />
        <Container width='450px' top='20vh'>
            <Avatar user={user} top='-80px'/>
            <Content>
                <Link>
                    <Icon className="fa fa-user" aria-hidden="true" />
                    <Name>Profil</Name>
                </Link>
                <Link>
                    <Icon className="fa fa-search" aria-hidden="true" />
                    <Name>Search</Name>
                </Link>
                <Link>
                    <Icon className="fa fa-edit" aria-hidden="true" />
                    <Name>Profil</Name>
                </Link>
                <Link>
                    <Icon className="fa fa-comments" aria-hidden="true" />
                    <Name>Chat</Name>
                </Link>
            </Content>
        </Container>
    </div>
);

Home.propTypes = {
    user: PropTypes.object.isRequired,
}

const actions = {};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);