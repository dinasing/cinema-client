import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import MovieTime from './components/movie/MovieTime';
import Movies from './components/movie/Movie';
import MovieTheaters from './components/movie/MovieTheater';

export default class Routes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/movies" component={Movies} />
        <Route path="/movie-times" component={MovieTime} />
        <Route path="/movie-theaters" component={MovieTheaters} />
      </Switch>
    );
  }
}
