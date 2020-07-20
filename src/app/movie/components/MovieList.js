import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovies, deleteMovie, editMovie } from '../actions/movieAction';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  CardFooter,
  FormGroup,
} from 'reactstrap';
import NewMovieForm from './NewMovieForm';
import EditMovieModal from './EditMovieModal';

const MovieCard = props => {
  return (
    <Card>
      <CardImg src={props.movie.poster}></CardImg>
      <CardBody>
        <CardTitle>
          <Link to={'/movies/' + props.movie.id}> {props.movie.title}</Link>
        </CardTitle>
        <CardText>{props.movie.release_date + ' - ' + props.movie.end_date}</CardText>
        <FormGroup className="float-right" row>
          <EditMovieModal movie={props.movie} />{' '}
          <Button onClick={() => props.deleteMovie(props.movie.id)} color="danger">
            delete
          </Button>
        </FormGroup>{' '}
      </CardBody>
    </Card>
  );
};

export class MovieList extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  handleDelete = id => {
    this.props.deleteMovie(id);
  };

  movieList() {
    const { movies } = this.props.movies;
    return movies.map(movie => {
      return (
        <MovieCard movie={movie} key={movie.id} deleteMovie={() => this.handleDelete(movie.id)} />
      );
    });
  }

  render() {
    return (
      <>
        <NewMovieForm />
        <h2>Movies</h2>
        {this.props.movies.loading ? (
          <p>Loading movies ...</p>
        ) : this.props.movies.movies[0] ? (
          this.movieList()
        ) : (
          <p>There are no movies at the box office right now.</p>
        )}
      </>
    );
  }
}
MovieList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  movies: PropTypes.object,
};

const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
});

export default connect(mapStateToProps, { getMovies, deleteMovie, editMovie })(MovieList);
