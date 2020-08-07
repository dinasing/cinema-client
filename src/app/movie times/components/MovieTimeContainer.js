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
      message: null,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleCinemaHallIdChange = e => {
    const { cinemaHalls, seatsTypes } = this.props.movieTime;
    const seatsTypesOptions = this.createSeatsTypesOptions(
      seatsTypes,
      cinemaHalls,
      +e.target.value
    );
    const newPrices = seatsTypesOptions.map(seatsType => ({
      seatsTypeId: seatsType.id,
      amountOfMoney: 0,
    }));

    this.setState({
      prices: newPrices,
      cinemaHallId: Number(e.target.value),
      seatsTypes: seatsTypesOptions,
    });
  };

  handleSeatsTypePriceChange = id => e => {
    const newPrices = this.state.prices.map(price => {
      if (id !== price.seatsTypeId) {
        return price;
      }
      return { ...price, amountOfMoney: e.target.value };
    });
    this.setState({
      prices: newPrices,
    });
  };

  createSeatsTypesOptions(seatsTypes, cinemaHalls, cinemaHallId) {
    const cinemaHall = cinemaHalls.find(cinemaHall => cinemaHall.id === cinemaHallId);
    const cinemaHallSeatsTypes = new Set(cinemaHall.schema.map(row => Number(row.seatsType)));
    
    return seatsTypes.filter(seatsType => cinemaHallSeatsTypes.has(seatsType.id));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: null });
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
      this.setState({
        message: error.id === 'ADD_SIT_TYPE_FAIL' ? error.message.message : null,
      });
    }
  }

  render() {
    let { movies, cinemas, cinemaHalls, seatsTypes } = this.props.movieTime;

    return (
      <Container>
        {this.state.message ? <Alert color="warning">{this.state.message}</Alert> : null}

        <NewMovieTimeForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cinemas={cinemas}
          cinemaHalls={cinemaHalls}
          cinemaId={this.state.cinemaId}
          cinemaHallId={this.state.cinemaHallId}
          movieId={this.state.movieId}
          movies={movies}
          seatsTypes={seatsTypes}
          handleCinemaHallIdChange={this.handleCinemaHallIdChange}
          handleSeatsTypePriceChange={this.handleSeatsTypePriceChange}
          createSeatsTypesOptions={this.createSeatsTypesOptions}
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
