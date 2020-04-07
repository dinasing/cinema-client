import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovieById } from '../../app/actions/movieAction';

class Movie extends Component {
  componentDidMount() {
    this.props.getMovieById(this.props.match.params.movie_id);
  }
  render() {
    const { movie } = this.props.movies;
    return <>{movie.title}</>;
  }
}

Movie.propTypes = {
  getMovieById: PropTypes.func.isRequired,
  movies: PropTypes.object,
};
const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
});
export default connect(mapStateToProps, { getMovieById })(Movie);
