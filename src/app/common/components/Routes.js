import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../../auth/components/Login';
import SignUp from '../../auth/components/SignUp';
import NewMovieTimeFromContainer from '../../movie times/components/NewMovieTimeFromContainer';
import Movies from '../../movie/components/MovieList';
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
import EditSpecificMovieContainer from '../../movie/components/EditSpecificMovieContainer';
import EditSpecificCinema from '../../cinema/components/EditSpecificCinemaContainer';
import CinemaHallsContainer from '../../cinema/components/CinemaHallsContainer';
import AddCinemaHallContainer from '../../cinema/components/AddCinemaHallContainer';
import DeleteMovieTimeContainer from '../../movie times/components/DeleteMovieTimeContainer';
import AdditionalGoodsContainer from '../../cinema/components/AdditionalGoodsContainer';
import AddAdditionalGoodsContainer from '../../cinema/components/AddAdditionalGoodsContainer';

class Routes extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Switch>
        <Route
          path="/login"
          render={() => (isAuthenticated ? <Redirect to="/movies" /> : <Login />)}
        />
        <Route
          path="/signup"
          render={() => (isAuthenticated ? <Redirect to="/movies" /> : <SignUp />)}
        />
        <ProtectedRoute exact path="/movies/edit" component={EditMovieContainer} store={store} />

        <ProtectedRoute exact path="/movies/add" component={NewMovieForm} store={store} />

        <ProtectedRoute
          exact
          path="/movie-theaters/edit"
          component={EditCinemaContainer}
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

        <ProtectedRoute path="/settings" component={SeatTypeFormContainer} store={store} />
        <ProtectedRoute exact path="/movie-theaters" component={MovieTheaters} store={store} />

        <ProtectedRoute
          exact
          path="/movie-theaters/:id/halls"
          component={CinemaHallsContainer}
          store={store}
        />

        <ProtectedRoute
          exact
          path="/movie-theaters/:id/additional-goods"
          component={AdditionalGoodsContainer}
          store={store}
        />

        <ProtectedRoute
          exact
          path="/movie-theaters/:id/add-additional-goods"
          component={AddAdditionalGoodsContainer}
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

        <ProtectedRoute
          path="/movie-theaters/:id/add-movie-session"
          component={NewMovieTimeFromContainer}
          store={store}
        />

        <ProtectedRoute
          path="/movie-theaters/:id/delete-movie-session"
          component={DeleteMovieTimeContainer}
          store={store}
        />
        <ProtectedRoute path="/movie-theaters/:id" component={MovieTheater} store={store} />
        <ProtectedRoute exact path="/movies" component={Movies} store={store} />
        <Route
          exact
          path="/"
          render={() => (isAuthenticated ? <Redirect to="/movies" /> : <Login />)}
        />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
});

export default connect(mapStateToProps, null)(Routes);
