import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { getMovieById, getMovieTimes } from '../actions/movieAction';

class Movie extends Component {
  componentDidMount() {
    this.props.getMovieById(this.props.match.params.movie_id);
    this.props.getMovieTimes(this.props.match.params.movie_id);
  }

  render() {
    const { movie, movieTimes } = this.props.movies;

    return (
      <>
        <h2>{movie.title}</h2>
        {movieTimes.length
          ? movieTimes.map(movieTime => {
            return (
              <div key={movieTime.id}>
                <Card>
                  <CardBody>
                    <CardTitle>{movieTime.date}</CardTitle>
                    <CardText>
                      {movieTime.cinema.title + '  ' + movieTime.time.slice(0, -3)}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            );
          })
          : this.props.movies.movieTimesLoading
            ? 'Loading ...'
            : 'There are no movie times for "' + movie.title + '" right now'}
      </>
    );
  }
}

Movie.propTypes = {
  getMovieById: PropTypes.func.isRequired,
  getMovieTimes: PropTypes.func.isRequired,
  movies: PropTypes.object,
};

const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
});

export default connect(mapStateToProps, { getMovieById, getMovieTimes })(Movie);
