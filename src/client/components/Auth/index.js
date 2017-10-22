import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../Login';

const Auth = ({ user, children }) => {
  if (user.login) {
    return children;
  }
  else return <Login />
};

Auth.propTypes = {
  user: PropTypes.object.isRequired,
}

const actions = {};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);