import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCinemaHallsForCinema,
  getMoviesForCinema,
  getMovieTimesForCinema,
  deleteMovieTimes,
} from '../actions/movieTimeAction';
import DeleteMovieTime from './DeleteMovieTime';

class DeleteMovieTimeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: '',
      cinemaHallId: '',
      time: '',
      msg: null,
      dateRange: {
        startDate: new Date().setHours(0, 0, 0, 0),
        endDate: new Date().setHours(0, 0, 0, 0),
        key: 'selection',
      },
    };
  }

  componentDidMount() {
    this.props.getMoviesForCinema(this.props.match.params.id);
    this.props.getCinemaHallsForCinema(this.props.match.params.id);
    this.props.getMovieTimesForCinema(this.props.match.params.id);
    this.setState({
      cinemaId: this.props.match.params.id,
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleDateRangeChange = range => {
    this.setState({ dateRange: range.selection });
  };

  handleSubmit = movieTimesToDelete => e => {
    e.preventDefault();

    const idsToDelete = movieTimesToDelete.map(movieTime => movieTime.id);
    this.props.deleteMovieTimes(idsToDelete);
  };

  render() {
    const { movies, cinemaHalls, movieTimes } = this.props.movieTime;
    const { dateRange, cinemaHallId, movieId, time, msg } = this.state;

    return (
      <>
        <DeleteMovieTime
          movieTimes={movieTimes}
          cinemaHalls={cinemaHalls}
          handleDateRangeChange={this.handleDateRangeChange}
          dateRange={dateRange}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cinemaHallId={cinemaHallId}
          movieId={movieId}
          movies={movies}
          time={time}
        />
      </>
    );
  }
}

DeleteMovieTimeContainer.propTypes = {
  getMovieTimesForCinema: PropTypes.func.isRequired,
  getMoviesForCinema: PropTypes.func.isRequired,
  getCinemaHallsForCinema: PropTypes.func.isRequired,
  cinemas: PropTypes.object,
  deleteMovieTimes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cinema: state.rootReducer.cinema,
  movieTime: state.rootReducer.movieTime,
});

export default connect(mapStateToProps, {
  getMovieTimesForCinema,
  getCinemaHallsForCinema,
  getMoviesForCinema,
  deleteMovieTimes,
})(DeleteMovieTimeContainer);
