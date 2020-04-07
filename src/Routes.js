import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import MovieTimes from './components/movie/MovieTimesList';
import Movies from './components/movie/MovieList';
import Movie from './components/movie/Movie';
import MovieTheaters from './components/movie/MovieTheatersList';

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
        <Route exact path="/movies" component={Movies} />
        <Route path="/movies/:movie_id" component={Movie} />
        <Route path="/movie-times" component={MovieTimes} />
        <Route path="/movie-theaters" component={MovieTheaters} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    );
  }
}
