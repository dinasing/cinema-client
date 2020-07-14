import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../../auth/components/Login';
import SignUp from '../../auth/components/SignUp';
import MovieTimes from '../../movie times/components/MovieTimeContainer';
import Movies from '../../movie/components/MovieList';
import DeleteMovieContainer from '../../movie/components/DeleteMovieContainer';
import Movie from '../../movie/components/Movie';
import MovieTheater from '../../cinema/components/Cinema';
import MovieTheaters from '../../cinema/components/CinemaList';
import SeatTypeFormContainer from '../../seatType/components/SeatTypeContainer';
import { ProtectedRoute } from './ProtectedRoute';
import { store } from '../../store';
import NewMovieForm from '../../movie/components/NewMovieContainer';
import NewCinemaForm from '../../cinema/components/NewCinemaForm';
import EditMovieContainer from '../../movie/components/EditMovieContainer';
import EditCinemaContainer from '../../cinema/components/EditCinemaContainer';
import DeleteCinemaContainer from '../../cinema/components/DeleteCinemaContainer';
import EditSpecificMovieContainer from '../../movie/components/EditSpecificMovieContainer';
import EditSpecificCinema from '../../cinema/components/EditSpecificCinemaContainer';
import CinemaHallsContainer from '../../cinema/components/CinemaHallsContainer';
import AddCinemaHallContainer from '../../cinema/components/AddCinemaHallContainer';

class Routes extends Component {
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
        <ProtectedRoute exact path="/movies/edit" component={EditMovieContainer} store={store} />
        <ProtectedRoute
          exact
          path="/movies/delete"
          component={DeleteMovieContainer}
          store={store}
        />
        <ProtectedRoute exact path="/movies/add" component={NewMovieForm} store={store} />

        <ProtectedRoute
          exact
          path="/movie-theaters/edit"
          component={EditCinemaContainer}
          store={store}
        />
        <ProtectedRoute
          exact
          path="/movie-theaters/delete"
          component={DeleteCinemaContainer}
          store={store}
        />
        <ProtectedRoute exact path="/movie-theaters/add" component={NewCinemaForm} store={store} />

        <ProtectedRoute exact path="/movies/:movie_id" component={Movie} store={store} />
        <ProtectedRoute
          exact
          path="/movies/:movie_id/edit/"
          component={EditSpecificMovieContainer}
          store={store}
        />
        <ProtectedRoute path="/movie-times" component={MovieTimes} store={store} />
        <ProtectedRoute path="/settings" component={SeatTypeFormContainer} store={store} />
        <ProtectedRoute exact path="/movie-theaters" component={MovieTheaters} store={store} />

        <ProtectedRoute
          exact
          path="/movie-theaters/:id/halls"
          component={CinemaHallsContainer}
          store={store}
        />

        <ProtectedRoute
          path="/movie-theaters/:id/edit"
          component={EditSpecificCinema}
          store={store}
        />

        <ProtectedRoute
          path="/movie-theaters/:id/add-hall"
          component={AddCinemaHallContainer}
          store={store}
        />
        <ProtectedRoute path="/movie-theaters/:id" component={MovieTheater} store={store} />
        <ProtectedRoute exact path="/movies" component={Movies} store={store} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
});

export default connect(mapStateToProps, null)(Routes);
