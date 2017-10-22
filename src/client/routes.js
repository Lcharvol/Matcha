import React from 'react';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Auth from './components/Auth';
import Register from './components/Register';

export default (
    <Switch>
        <Route exact path="/" component={() => <Auth><Home /></Auth>}/>
        <Route exact path="/login" component={() => <Login />}/>
        <Route exact path="/register" component={() => <Register />}/>
        <Redirect from="*" to="/" />
    </Switch>
);