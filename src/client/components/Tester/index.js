import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Tester extends Component {

    componentWillMount() {
      const matchaToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTUxMDY5Mjk2NiwiZXhwIjoxNTEwNzI4OTY2fQ.hKtDQNluRCjmU2Y3UU8rMl719Ks3hBZUGT9YxBPntZU';
      getUser({ matchaToken });
    }

    render() {
      return (
        <div>
          test
        </div>
      );
    }
};

const getState = (state) => state.currentUser;

const mapStateToProps = state => ({
  user: state.user,
});

const GET_USER = 'server:user:get';
const USER_GETTED = 'resp:server:user:get';
const getUser = (user) => ({ type: GET_USER, payload: user, replyTo: USER_GETTED });

const actions = {
  getUser,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Tester);
