/* eslint-disable */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

export default class Routes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    );
  }
}
