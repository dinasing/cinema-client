import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMovieById, getMovieTimes } from '../actions/movieAction';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import moment from 'moment';
import { withMenu } from '../../menu/withMenu';
import { MOVIES_MENU_ITEMS } from '../../menu/menuItemsConstants';

class Movie extends Component {
  componentDidMount() {
    this.props.getMovieById(this.props.match.params.movie_id);
    this.props.getMovieTimes(this.props.match.params.movie_id);
  }

  render() {
    const { movie, movieTimes } = this.props.movies;

    return (
      <>
        <h2>
          {movie.title}{' '}
          <small>
            <Link to={'/movies/' + movie.id + '/edit/'}>edit</Link>
          </small>
        </h2>

        <img
          height="250px"
          self-align="center"
          src={
            movie.poster
              ? movie.poster
              : 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Out_Of_Poster.jpg'
          }
        />
        {movieTimes[0]
          ? movieTimes.map(movieTime => {
              return (
                <div key={movieTime.id}>
                  <Card>
                    <CardBody>
                      <CardTitle>{moment(movieTime.date).format('DD.MM.YYYY')}</CardTitle>
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

export default connect(mapStateToProps, { getMovieById, getMovieTimes })(
  withMenu(Movie, MOVIES_MENU_ITEMS)
);
