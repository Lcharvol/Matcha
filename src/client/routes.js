import React from 'react';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

export default (
    <Switch>
        <Route exact path="/" component={() => <Login />}/>
        <Route exact path="/login" component={() => <Login />}/>
        <Route exact path="/register" component={() => <Register />}/>
        <Redirect from="*" to="/" />
    </Switch>
);