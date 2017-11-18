import React from 'react';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Auth from './components/Auth';
import Register from './components/Register';
import EditProfil from './components/EditProfil';
import Profil from './components/Profil';
import Chat from './components/Chat';
import Tester from './components/Tester';

export default (
    <Switch>
        <Route exact path="/tester" component={() => <Tester />}/>
        <Route exact path="/" component={() => <Auth><Home /></Auth>}/>
        <Route exact path="/login" component={() => <Auth><Login /></Auth>}/>
        <Route exact path="/register" component={() => <Auth><Register /></Auth>}/>
        <Route exact path="/editprofil" component={() => <EditProfil />}/>
        <Route exact path="/profil" component={() => <Profil />}/>
        <Route exact path="/chat" component={() => <Chat />}/>
        <Redirect from="*" to="/" />
    </Switch>
);
