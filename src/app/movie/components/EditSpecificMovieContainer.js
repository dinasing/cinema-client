import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { editMovie } from '../actions/movieAction';
import { clearErrors } from '../../common/actions/errorAction';
import { withMenu } from '../../menu/withMenu';
import { MOVIES_MENU_ITEMS } from '../../menu/menuItemsConstants';
import EditMovieForm from './EditMovieForm';

class EditMovieContainer extends Component {
  state = {
    editedMovieInfo: {},
    message: null,
    areChangesSaved: false,
    movieToEdit: {},
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
    editedMovie.id = this.state.movieToEdit.id;
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

  componentDidMount() {
    this.setState({
      movieToEdit: this.props.movies.movie,
    });
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
    const { areChangesSaved, message, movieToEdit } = this.state;

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
        {movieToEdit ? (
          <EditMovieForm
            movieToEdit={movieToEdit}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          `there is nothing to edit`
        )}
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
