import React, { Component } from 'react';
import MovieList, { MovieCardWithDeleteButton } from './MovieList';

class DeleteMovieContainer extends Component {
  render() {
    return <>{<MovieList CardComponent={MovieCardWithDeleteButton} />}</>;
  }
}
export default DeleteMovieContainer;
