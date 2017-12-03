import React from 'react';
import styled from 'styled-components';
import { compose } from 'ramda';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadNotifications } from '../../actions/notifications';
import { loadUser, loadUsers } from '../../actions/users';
import { reqGetAll, reqMe, reqGetNotifs } from '../../request';

const AppStyled = styled.div`
  position:relative;
  background-color: rgb(230,230,230);
  background: linear-gradient( 160deg, rgba(244, 92, 67, 0.75) 0%, #EA5555  120%);
  bottom:0px;
  font-family: 'PT Sans', sans-serif;
  overflow-x: hidden;
`;

const App = (props) => (
  <AppStyled>
    {props.children}
  </AppStyled>
)

const actions = { loadUsers, loadUser, loadNotifications };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
      componentDidMount() {
        reqGetAll(this.props.loadUsers, { sort: 'location,desc' })
        .catch(err => {
            console.log('zbob', err);
        });
        reqMe(this.props.loadUser);
        reqGetNotifs()
        .then(notifications => {
          this.props.loadNotifications(notifications)
        })
        .catch(err => {
        });
      },
  }),
)

export default enhance(App);

