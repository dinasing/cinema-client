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
    msg: null,
    isChangesSaved: false,
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
      isChangesSaved: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'EDIT_MOVIE_FAIL') {
        this.setState({ msg: error.msg || "Changes haven't been saved!", isChangesSaved: false });
      } else {
        this.setState({ msg: 'null', isChangesSaved: true });
      }
    }
  }

  componentDidMount() {
    this.setState({
      movieToEdit: this.props.movies.movie,
    });
  }

  onDismissSuccessAlert = () => {
    this.setState({
      isChangesSaved: false,
    });
  };

  onDismissErrorAlert = () => {
    this.setState({
      msg: false,
    });
  };

  render() {
    const { isChangesSaved, msg, movieToEdit } = this.state;

    return (
      <>
        <Alert isOpen={msg} toggle={this.onDismissErrorAlert} color="danger">
          {this.state.msg}
        </Alert>

        <Alert isOpen={isChangesSaved && !msg} toggle={this.onDismissSuccessAlert} color="primary">
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
