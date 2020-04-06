import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovies } from '../../app/actions/movieAction';
import { Link } from 'react-router-dom';

export class MovieTheaters extends Component {
  componentDidMount() {
    this.props.getMovies();
  }
  render() {
    const { movies } = this.props.movies;
    return (
      <>
        <h2>Movie theaters</h2>
        {this.props.movies.loading ? (
          <p>Loading movies ...</p>
        ) : (
          movies.map(movie => {
            return <Link to={movie.title + movie.id}> {movie.title}</Link>;
          })
        )}
      </>
    );
  }
}
MovieTheaters.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.object,
};
const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
});
export default connect(mapStateToProps, { getMovies })(MovieTheaters);
