import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import NewMovieTimeForm from './NewMovieTimeForm';
import { addMovieTime, getMovies, getCinemaHalls, getSeatsTypes } from '../actions/movieTimeAction';
import { clearErrors } from '../../common/actions/errorAction';
import { getAdditionalGoods } from '../../cinema/actions/additionalGoodsAction';

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
      additionalGoodsPrices: [],
    };
  }

  componentDidMount() {
    this.props.getMovies();
    this.props.getCinemaHalls();
    this.props.getSeatsTypes();
    this.props.getAdditionalGoods();
    this.setState({
      cinemaId: this.props.match.params.id,
    });
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'ADD_MOVIE_TIME_FAIL' ? error.message : null });
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

  createSeatsTypesOptions(seatsTypes, cinemaHalls, cinemaHallId) {
    const cinemaHall = cinemaHalls.find(cinemaHall => cinemaHall.id == cinemaHallId);
    const cinemaHallSeatsTypes = new Set(cinemaHall.schema.map(row => Number(row.seatsType)));

    return seatsTypes.filter(seatsType => cinemaHallSeatsTypes.has(seatsType.id));
  }

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
      additionalGoodsPrices,
    } = this.state;
    const newMovieTime = additionalGoodsPrices.length
      ? {
          startDate,
          endDate,
          time,
          cinemaHallId,
          cinemaId,
          movieId,
          prices,
          additionalGoodsPrices,
        }
      : {
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

  handleChangeSelectedGoods = e => {
    const goods = [];
    for (const option of e.target.options) {
      if (option.selected) {
        goods.push(option.value);
      }
    }

    if (goods[0] === '') {
      this.setState({ additionalGoodsPrices: [] });
    } else {
      let { additionalGoodsPrices } = this.state;
      additionalGoodsPrices = additionalGoodsPrices.filter(goodsPrices =>
        goods.includes(goodsPrices.additionalGoodsId)
      );
      goods.forEach(item => {
        //look through selected goods and check if it isn't in already selected goods from goodsPrices
        if (!additionalGoodsPrices.find(goodsPrices => goodsPrices.additionalGoodsId == item)) {
          additionalGoodsPrices = additionalGoodsPrices.concat([
            { additionalGoodsId: item, amountOfMoney: 0 },
          ]);
        }
      });
      this.setState({ additionalGoodsPrices });
    }
  };

  handleGoodsPriceChange = additionalGoodsId => e => {
    const newPrices = this.state.additionalGoodsPrices.map(price => {
      return additionalGoodsId !== price.additionalGoodsId
        ? price
        : { ...price, amountOfMoney: e.target.value };
    });
    this.setState({
      additionalGoodsPrices: newPrices,
    });
  };

  handleDateRangeChange = range => {
    this.setState({ dateRange: range.selection });
  };

  render() {
    const { movies, cinemas, cinemaHalls, seatsTypes } = this.props.movieTime;
    const { additionalGoods } = this.props.additionalGoods;
    const {
      dateRange,
      cinemaId,
      cinemaHallId,
      movieId,
      message,
      additionalGoodsPrices,
    } = this.state;

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
          createSeatsTypesOptions={this.createSeatsTypesOptions}
          movieId={movieId}
          movies={movies}
          seatsTypes={seatsTypes}
          handleCinemaHallIdChange={this.handleCinemaHallIdChange}
          handleSeatsTypePriceChange={this.handleSeatsTypePriceChange}
          additionalGoods={additionalGoods}
          additionalGoodsPrices={additionalGoodsPrices}
          handleChangeSelectedGoods={this.handleChangeSelectedGoods}
          handleGoodsPriceChange={this.handleGoodsPriceChange}
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
  getAdditionalGoods: PropTypes.func.isRequired,
  movieTime: PropTypes.object,
  additionalGoods: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  movieTime: state.rootReducer.movieTime,
  additionalGoods: state.rootReducer.additionalGoods,
});

export default connect(mapStateToProps, {
  addMovieTime,
  clearErrors,
  getCinemaHalls,
  getMovies,
  getSeatsTypes,
  getAdditionalGoods,
})(MovieTimeFormContainer);
