import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../history';
import { reqAuth } from '../../request';
import Login from '../Login';
import Register from '../Register';
import Lost from '../Lost';

// 2 - No response
// 1 - bad
// 0 - good
class Auth extends Component {

  state = {
    authorized: 2,
  }

  async componentWillMount() {
    const resp = await reqAuth();
    const { children, revertCheck, path } = this.props;
    console.log(resp.status, revertCheck);
    if (resp.status === 201) {
      history.push({
        pathname: path,
        search: location.search,
      });
      this.setState({ authorized: 1 });
    } else if (revertCheck === true) {
      history.push('/');
      location.reload();
    } else
      this.setState({ authorized: 0 });
  }

  render() {
    const { children, revertCheck, path } = this.props;
    const { authorized } = this.state;
    //  // if (window.location.pathname.substr(1).match(/^login|register$/) && authorized)
    if (authorized === 0)
      return children;
    if (authorized === 1){
      if (path === '/login') return <Login />;
      if (path === '/register') return <Register />;
      if (path === '/lost') return <Lost />;
      if(!path) return <Login />;
    }
    if (authorized === 2)
      return null;
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
