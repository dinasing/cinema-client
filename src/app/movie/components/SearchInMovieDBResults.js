import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

export default class SearchInMovieDBResults extends Component {
  render() {
    const movies = this.props.moviesFromTheMovieDB || [];

    if (!movies[0]) {
      return null;
    }
    const moviesWithEditedPosterLinks = movies.map(movie => {
      movie.poster_path = movie.poster_path
        ? `http://image.tmdb.org/t/p/w185${movie.poster_path}`
        : null;
      return movie;
    });

    return (
      <Table>
        {moviesWithEditedPosterLinks.map(movie => (
          <tr>
            <td>
              <img
                width="185px"
                src={movie.poster_path || 'https://kinoactive.ru/uploads/no-poster.jpg'}
                alt="poster"
              />
            </td>
            <td>
              <tr>
                <h3>{movie.title}</h3>
              </tr>
              <tr>{movie.overview}</tr>
              <br />
              <tr>
                <Button color="primary">use info</Button>
              </tr>
            </td>
          </tr>
        ))}
      </Table>
    );
  }
}
