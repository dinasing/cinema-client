import React, { Component } from 'react';
import {
  addMovieTime,
  getCinemas,
  getMovies,
  getCinemaHalls,
  getSeatsTypes,
} from '../actions/movieTimeAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import NewMovieTimeForm from './NewMovieTimeForm';

class MovieTimeFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cinemaId: '',
      movieId: '',
      cinemaHallId: '',
      time: '',
      date: '',
      seatsTypes: '',
      prices: [],
      msg: null,
      dateRange: {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    };
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

  createSeatsTypesOptions(seatsTypes, cinemaHalls, cinemaHallId) {
    const cinemaHall = cinemaHalls.filter(cinemaHall => cinemaHall.id == cinemaHallId)[0];
    let cinemaHallSeatsTypes = new Set();
    for (const row of cinemaHall.schema) {
      cinemaHallSeatsTypes.add(Number(row.seatsType));
    }

    return seatsTypes.filter(seatsType => cinemaHallSeatsTypes.has(seatsType.id));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ msg: null });
    const { date, time, cinemaHallId, cinemaId, movieId, prices } = this.state;
    const newMovieTime = {
      date,
      time,
      cinemaHallId,
      cinemaId,
      movieId,
      prices,
    };
    this.props.addMovieTime(newMovieTime);
  };

  componentDidMount() {
    this.props.getCinemas();
    this.props.getMovies();
    this.props.getCinemaHalls();
    this.props.getSeatsTypes();
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

  handleDateRangeChange = range => {
    this.setState({ dateRange: range.selection });
  };

  render() {
    const { movies, cinemas, cinemaHalls, seatsTypes } = this.props.movieTime;
    const { dateRange, cinemaId, cinemaHallId, movieId, msg } = this.state;

    return (
      <Container>
        {msg ? <Alert color="warning">{msg}</Alert> : null}

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
  getCinemas: PropTypes.func.isRequired,
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
  getCinemas,
  getMovies,
  getSeatsTypes,
})(MovieTimeFormContainer);
