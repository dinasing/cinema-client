import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Options } from '../../common/components/Options';
import { editMovie } from '../actions/movieAction';
import { clearErrors } from '../../common/actions/errorAction';
import { withMenu } from '../../menu/withMenu';
import { MOVIES_MENU_ITEMS } from '../../menu/menuItemsConstants';
import EditMovieForm from './EditMovieForm';

class EditMovieContainer extends Component {
  state = {
    movieToEditId: '',
    editedMovieInfo: {},
    message: null,
    areChangesSaved: false,
  };

  handleIdChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      editedMovieInfo: {},
    });
  };

  handleChange = e => {
    this.setState({
      editedMovieInfo: { ...this.state.editedMovieInfo, [e.target.id]: e.target.value },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    clearErrors();
    const editedMovie = this.state.editedMovieInfo;
    editedMovie.id = this.state.movieToEditId;
    this.props.editMovie(editedMovie);

    this.setState({
      editedMovieInfo: {},
      areChangesSaved: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({
        message: error.id === 'EDIT_MOVIE_FAIL' ? "Changes haven't been saved!" : null,
        areChangesSaved: error.id !== 'EDIT_MOVIE_FAIL',
      });
    }
  }

  onDismissSuccessAlert = () => {
    this.setState({
      areChangesSaved: false,
    });
  };

  onDismissErrorAlert = () => {
    this.setState({
      message: false,
    });
  };

  render() {
    const { movies } = this.props.movies;
    const { movieToEditId, areChangesSaved, message } = this.state;
    const movieToEdit = movies.find(movie => +movieToEditId === +movie.id);

    return (
      <>
        <Alert isOpen={message} toggle={this.onDismissErrorAlert} color="danger">
          {this.state.message}
        </Alert>

        <Alert
          isOpen={areChangesSaved && !message}
          toggle={this.onDismissSuccessAlert}
          color="primary"
        >
          Changes saved successfully!
        </Alert>
        <Input
          defaultValue=""
          required
          className="mb-3"
          type="select"
          id="movieToEditId"
          onChange={this.handleIdChange}
        >
          <option value="" disabled>
            select movie to edit
          </option>
          <Options items={movies} />
        </Input>
        {movieToEdit ? (
          <EditMovieForm
            movieToEdit={movieToEdit}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
      </>
    );
  }
}

EditMovieContainer.propTypes = {
  movies: PropTypes.object,
};

const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
  error: state.rootReducer.error,
});

export default connect(mapStateToProps, { editMovie })(
  withMenu(EditMovieContainer, MOVIES_MENU_ITEMS)
);
