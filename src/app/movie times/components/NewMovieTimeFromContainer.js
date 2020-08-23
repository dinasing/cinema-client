import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import NewMovieTimeForm from './NewMovieTimeForm';
import { addMovieTime, getMovies, getCinemaHalls, getSeatsTypes } from '../actions/movieTimeAction';
import { clearErrors } from '../../common/actions/errorAction';

class MovieTimeFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cinemaId: '',
      movieId: '',
      cinemaHallId: '',
      time: '',
      prices: [],
      message: null,
      dateRange: {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    };
  }

  componentDidMount() {
    this.props.getMovies();
    this.props.getCinemaHalls();
    this.props.getSeatsTypes();
    this.setState({
      cinemaId: this.props.match.params.id,
    });
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'ADD_MOVIE_TIME_FAIL' ? error.message.message : null });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleCinemaHallIdChange = e => {
    this.setState({ cinemaHallId: e.target.value });
    let { cinemaHalls, seatsTypes } = this.props.movieTime;
    const seatsTypesOptions = this.createSeatsTypesOptions(seatsTypes, cinemaHalls, e.target.value);
    this.setState({ seatsTypes: seatsTypesOptions });
    let newPrices = [];
    for (const seatsType of seatsTypesOptions) {
      newPrices.push({ seatsTypeId: seatsType.id, amountOfMoney: 0 });
    }
    this.setState({ prices: newPrices });
  };

  handleSeatsTypePriceChange = id => e => {
    const newPrices = this.state.prices.map(price => {
      if (id !== price.seatsTypeId) return price;
      return { ...price, amountOfMoney: e.target.value };
    });
    this.setState({
      prices: newPrices,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: null });
    const {
      dateRange: { startDate, endDate },
      time,
      cinemaHallId,
      cinemaId,
      movieId,
      prices,
    } = this.state;

    const newMovieTime = {
      startDate,
      endDate,
      time,
      cinemaHallId,
      cinemaId,
      movieId,
      prices,
    };
    this.props.addMovieTime(newMovieTime);
  };

  handleDateRangeChange = range => {
    this.setState({ dateRange: range.selection });
  };

  render() {
    const { movies, cinemas, cinemaHalls, seatsTypes } = this.props.movieTime;
    const { dateRange, cinemaId, cinemaHallId, movieId, message } = this.state;

    return (
      <Container>
        {message ? <Alert color="warning">{message}</Alert> : null}

        <NewMovieTimeForm
          handleDateRangeChange={this.handleDateRangeChange}
          dateRange={dateRange}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cinemas={cinemas}
          cinemaHalls={cinemaHalls}
          cinemaId={cinemaId}
          cinemaHallId={cinemaHallId}
          movieId={movieId}
          movies={movies}
          seatsTypes={seatsTypes}
          handleCinemaHallIdChange={this.handleCinemaHallIdChange}
          handleSeatsTypePriceChange={this.handleSeatsTypePriceChange}
        />
      </Container>
    );
  }
}

MovieTimeFormContainer.propTypes = {
  addMovieTime: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  getSeatsTypes: PropTypes.func.isRequired,
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
  getMovies,
  getSeatsTypes,
})(MovieTimeFormContainer);
