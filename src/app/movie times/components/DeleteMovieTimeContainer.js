import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCinemaHallsForCinema,
  getMoviesForCinema,
  getMovieTimesForCinema,
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
        startDate: new Date(),
        endDate: null,
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

  render() {
    const { movies, cinemaHalls, movieTimes } = this.props.movieTime;
    const { dateRange, cinemaHallId, movieId, time, msg } = this.state;
    const times = movieTimes;

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
          times={times}
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
};

const mapStateToProps = state => ({
  cinema: state.rootReducer.cinema,
  movieTime: state.rootReducer.movieTime,
});

export default connect(mapStateToProps, {
  getMovieTimesForCinema,
  getCinemaHallsForCinema,
  getMoviesForCinema,
})(DeleteMovieTimeContainer);
