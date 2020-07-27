import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from '../../auth/components/Login';
import SignUp from '../../auth/components/SignUp';
import MovieTimes from '../../movie times/components/MovieTimeContainer';
import Movies from '../../movie/components/MovieList';
import Movie from '../../movie/components/Movie';
import MovieTheater from '../../cinema/components/Cinema';
import MovieTheaters from '../../cinema/components/CinemaList';
import SitTypeFormContainer from '../../sitType/components/SitTypeContainer';

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
        <Route path="/settings" component={SitTypeFormContainer} />
        <Route exact path="/movie-theaters" component={MovieTheaters} />
        <Route path="/movie-theaters/:id" component={MovieTheater} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    );
  }
}
