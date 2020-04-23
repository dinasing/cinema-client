/* eslint-disable */
'use strict';
import React, { Component } from 'react';
import {
  addMovieTime,
  getCinemas,
  getMovies,
  getCinemaHalls,
  getSitsTypes,
} from '../actions/movieTimeAction';
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
    sitsTypes: '',
    prices: [],
    msg: null,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleCinemaHallIdChange = e => {
    this.setState({ cinemaHallId: e.target.value });
    let { cinemaHalls, sitsTypes } = this.props.movieTime;
    const sitsTypesOptions = this.createSitsTypesOptions(sitsTypes, cinemaHalls, e.target.value);
    this.setState({ sitsTypes: sitsTypesOptions });
    let newPrices = [];
    for (const sitsType of sitsTypesOptions) {
      newPrices.push({ sitsTypeId: sitsType.id, amountOfMoney: 0 });
    }
    this.setState({ prices: newPrices });
  };

  handleSitsTypePriceChange = id => e => {
    const newPrices = this.state.prices.map(price => {
      if (id !== price.sitsTypeId) return price;
      return { ...price, amountOfMoney: e.target.value };
    });
    this.setState({
      prices: newPrices,
    });
  };

  createSitsTypesOptions(sitsTypes, cinemaHalls, cinemaHallId) {
    const cinemaHall = cinemaHalls.filter(cinemaHall => cinemaHall.id == cinemaHallId)[0];
    let cinemaHallSitsTypes = new Set();
    for (const row of cinemaHall.schema) {
      cinemaHallSitsTypes.add(Number(row.sitsType));
    }

    return sitsTypes.filter(sitsType => cinemaHallSitsTypes.has(sitsType.id));
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
    this.props.getSitsTypes();
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
    let { movies, cinemas, cinemaHalls, sitsTypes } = this.props.movieTime;
    return (
      <Container>
        {this.state.msg ? <Alert color="warning">{this.state.msg}</Alert> : null}

        <NewMovieTimeForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cinemas={cinemas}
          cinemaHalls={cinemaHalls}
          cinemaId={this.state.cinemaId}
          cinemaHallId={this.state.cinemaHallId}
          movieId={this.state.movieId}
          movies={movies}
          sitsTypes={sitsTypes}
          handleCinemaHallIdChange={this.handleCinemaHallIdChange}
          handleSitsTypePriceChange={this.handleSitsTypePriceChange}
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
  getSitsTypes: PropTypes.func.isRequired,
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
  getSitsTypes,
})(MovieTimeFormContainer);
