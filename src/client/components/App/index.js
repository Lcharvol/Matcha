import React from 'react';
import styled from 'styled-components';
import { compose } from 'ramda';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUser, loadUsers } from '../../actions/users';
import { reqGetAll, reqMe } from '../../request';

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

const actions = { loadUsers, loadUser };

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
      },
  }),
)

export default enhance(App);

