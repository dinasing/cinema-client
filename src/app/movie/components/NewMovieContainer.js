import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Input, Alert } from 'reactstrap';
import { addMovie, performSearchFromTheMovieDB } from '../actions/movieAction';
import { clearErrors } from '../../common/actions/errorAction';
import EditMovieForm from './EditMovieForm';
import SearchInMovieDBResults from './SearchInMovieDBResults';

class NewMovieContainer extends Component {
  constructor(props) {
    super(props);

    state = {
      title: '',
      release_date: '',
      end_date: '',
      genre: [],
      description: '',
      poster: '',
      language: '',
      message: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      const message = error.id === 'ADD_MOVIES_FAIL' ? error.message.message : null;
      this.setState({ message });
    }
  }

  searchInputChangeHandle = e => {
    this.props.performSearchFromTheMovieDB(e.target.value);
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleGenresChange = e => {
    const genre = e.target.options.filter(option => option.selected).map(option => option.value);
    this.setState({ genre });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: null });
    const { title, release_date, end_date, genre, description, poster, language } = this.state;
    const newMovie = {
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
    };
    this.props.addMovie(newMovie);
  };

  setMovieInfoFromTheMovieDB = movie => () => {
    this.setState({
      title: movie.title,
      release_date: movie.release_date,
      end_date: '',
      genre: movie.genre_ids,
      description: movie.overview,
      poster: movie.poster_path ? `http://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      language: '',
    });
  };

  render() {
    const { results } = this.props.movies.moviesFromTheMovieDB;
    const { genres } = this.props.movies;
    const {
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
      message,
    } = this.state;
    const newMovie = {
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
    };

    return (
      <Container>
        {message ? <Alert color="warning">{message}</Alert> : null}

        <h2>add new movie</h2>
        <Input placeholder="Enter movie title..." onChange={this.searchInputChangeHandle} />
        <br />
        <SearchInMovieDBResults
          moviesFromTheMovieDB={results}
          setMovieInfoFromTheMovieDB={this.setMovieInfoFromTheMovieDB}
        />
        <EditMovieForm
          genres={genres}
          handleChange={this.handleChange}
          movieToEdit={newMovie}
          handleSubmit={this.handleSubmit}
          handleGenresChange={this.handleGenresChange}
        />
      </Container>
    );
  }
}

NewMovieContainer.propTypes = {
  addMovie: PropTypes.func.isRequired,
  performSearchFromTheMovieDB: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  movies: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  movies: state.rootReducer.movie,
});

export default connect(mapStateToProps, { addMovie, clearErrors, performSearchFromTheMovieDB })(
  NewMovieContainer
);
