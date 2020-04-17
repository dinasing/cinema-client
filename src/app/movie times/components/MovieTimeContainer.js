/* eslint-disable */
'use strict';
import React, { Component } from 'react';
import { addMovieTime, getCinemas, getMovies, getCinemaHalls } from '../actions/movieTimeAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import NewMovieTimeForm from './NewMovieTimeForm';

class MovieTimeFormContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    cinemaId: '',
    movieId: '',
    cinemaHallId: '',
    time: '',
    date: '',
    msg: null,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ msg: null });
    const { date, time, cinemaHallId, cinemaId, movieId } = this.state;
    const newMovieTime = {
      date,
      time,
      cinemaHallId,
      cinemaId,
      movieId,
    };
    this.props.addMovieTime(newMovieTime);
  };

  componentDidMount() {
    this.props.getCinemas();
    this.props.getMovies();
    this.props.getCinemaHalls();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'ADD_SIT_TYPE_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    let { movies, cinemas, cinemaHalls } = this.props.movieTime;
    return (
      <Container>
        {this.state.msg ? <Alert color="warning">{this.state.msg}</Alert> : null}
        <NewMovieTimeForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cinemas={cinemas}
          cinemaHalls={cinemaHalls}
          cinemaId={this.state.cinemaId}
          movieId={this.state.movieId}
          movies={movies}
        />
      </Container>
    );
  }
}
MovieTimeFormContainer.propTypes = {
  addMovieTime: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  getCinemas: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  getCinemaHalls: PropTypes.func.isRequired,
  movieTime: PropTypes.object,
};
const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  movieTime: state.rootReducer.movieTime,
});

export default connect(mapStateToProps, {
  addMovieTime,
  clearErrors,
  getCinemaHalls,
  getCinemas,
  getMovies,
})(MovieTimeFormContainer);
