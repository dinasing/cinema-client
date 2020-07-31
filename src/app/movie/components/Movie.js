import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  Container,
} from 'reactstrap';
import { getMovieById, getMovieTimes, deleteMovie } from '../actions/movieAction';
import MovieTimesList from '../components/MovieTimesList';

class Movie extends Component {
  state = {
    isDeleteModalOpen: false,
    isMovieDeleted: false,
  };

  componentDidMount() {
    this.props.getMovieById(this.props.match.params.movie_id);
    this.props.getMovieTimes(this.props.match.params.movie_id);
  }

  toggleDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: !this.state.isDeleteModalOpen,
    });
  };

  deleteMovieHandle = () => {
    const movieId = this.props.match.params.movie_id;

    this.props.deleteMovie(movieId);
    this.setState({
      isMovieDeleted: true,
    });
  };

  render() {
    const { movie, movieTimes } = this.props.movies;
    if (this.state.isMovieDeleted) return <Redirect to="/movies" />;
    return (
      <Container>
        <h2>
          {movie.title}{' '}
          <small>
            <Link to={'/movies/' + movie.id + '/edit/'}>edit</Link>
          </small>{' '}
          <small>
            <Link onClick={this.toggleDeleteModal}>delete</Link>
          </small>
          <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
            <ModalHeader>Are you sure you want to delete movie "{movie.title}"</ModalHeader>
            <ModalFooter>
              {' '}
              <Button onClick={this.deleteMovieHandle} color="danger">
                delete
              </Button>{' '}
              <Button onClick={this.toggleDeleteModal} color="primary">
                cancel
              </Button>
            </ModalFooter>
          </Modal>
        </h2>

        <img
          height="250px"
          self-align="center"
          src={movie.poster ? movie.poster : 'https://kinoactive.ru/uploads/no-poster.jpg'}
        />
        <br />
        {movieTimes.length ? (
          <MovieTimesList movieTimes={movieTimes} />
        ) : this.props.movies.movieTimesLoading ? (
          'Loading ...'
        ) : (
          'There are no movie times for "' + movie.title + '" right now'
        )}
      </Container>
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
export default connect(mapStateToProps, {
  getMovieById,
  getMovieTimes,
  deleteMovie,
})(Movie);
