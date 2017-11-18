import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../Login';
import Home from '../Home';
import { checkAuth } from '../../actions/user';

class Auth extends Component {

  state = {
    authorized: false,
  }

  async componentWillMount() {
    const resp = await checkAuth();
    // desactice ca pour pas avoir de auth
    if (resp.status === 201) {
      this.setState({ authorized: false });
    } else
      this.setState({ authorized: true});
  }

  render() {
    const { me, children } = this.props;
    const { authorized } = this.state;
    console.log(authorized);
    if (window.location.pathname.substr(1).match(/^login|register$/) && authorized)
      return <Home />; 
    if (authorized) return children;
    return <Login />;
  }
};

Auth.propTypes = {
  me: PropTypes.object,
}

const actions = {
};

const mapStateToProps = state => ({
  me: state.me,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
