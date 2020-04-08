import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovieById, getMovieTimes } from '../../app/actions/movieAction';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Movie extends Component {
  componentDidMount() {
    this.props.getMovieById(this.props.match.params.movie_id);
    this.props.getMovieTimes(this.props.match.params.movie_id);
  }
  render() {
    const { movie } = this.props.movies;
    const { movieTimes } = this.props.movies;
    return (
      <>
        <h2>{movie.title}</h2>
        {movieTimes.map(movieTime => {
          return (
            <div key={movieTime.id}>
              <Card>
                <CardBody>
                  <CardTitle>{movieTime.date}</CardTitle>
                  <CardText>{movieTime.cinema.title + '  ' + movieTime.time}</CardText>
                </CardBody>
              </Card>
            </div>
          );
        })}
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
