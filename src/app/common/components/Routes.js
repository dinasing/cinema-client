import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Login from '../../auth/components/Login';
import SignUp from '../../auth/components/SignUp';
import MovieTimes from '../../movie times/components/MovieTimeContainer';
import Movies from '../../movie/components/MovieList';
import Movie from '../../movie/components/Movie';
import MovieTheater from '../../cinema/components/Cinema';
import MovieTheaters from '../../cinema/components/CinemaList';
import SitTypeFormContainer from '../../sitType/components/SitTypeContainer';
import { connect } from 'react-redux';
import { ProtectedRoute } from '../../common/components/ProtectedRoute';
import { store } from '../../store';

class Routes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (isAuthenticated ? <Redirect to="/movies" /> : <Login />)}
        />
        <Route
          path="/login"
          render={() => (isAuthenticated ? <Redirect to="/movies" /> : <Login />)}
        />
        <Route
          path="/signup"
          render={() => (isAuthenticated ? <Redirect to="/movies" /> : <SignUp />)}
        />
        <ProtectedRoute exact path="/movies" component={Movies} store={store} />
        <ProtectedRoute path="/movies/:movie_id" component={Movie} store={store} />
        <ProtectedRoute path="/movie-times" component={MovieTimes} store={store} />
        <ProtectedRoute path="/settings" component={SitTypeFormContainer} store={store} />
        <ProtectedRoute exact path="/movie-theaters" component={MovieTheaters} store={store} />
        <ProtectedRoute path="/movie-theaters/:id" component={MovieTheater} store={store} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
});

export default connect(mapStateToProps, null)(Routes);
