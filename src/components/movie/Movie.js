import React, { Component } from 'react';
import connect from 'react-redux';
import PropTypes from 'prop-types';
import { getMovie } from '../../app/actions/movieAction';

class Movie extends Component {
  render() {
    const { movie } = this.props.movieReducer;
    return <>{movie.title}</>;
  }
}

Movie.propTypes = {
  getMovie: PropTypes.func.isRequired,
  movieReducer: PropTypes.object,
};
const mapStateToProps = state => ({
  movieReducer: state.rootReducer.movieReducer,
});
export default connect(mapStateToProps, { getMovie })(Movie);
