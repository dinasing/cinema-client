import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Options } from '../../common/components/Options';
import { Alert, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { editMovie } from '../actions/movieAction';
import { clearErrors } from '../../common/actions/errorAction';
import { withMenu } from '../../menu/withMenu';
import { MOVIES_MENU_ITEMS } from '../../menu/menuItemsConstants';
import EditMovieForm from './EditMovieForm';

class EditMovieContainer extends Component {
  state = {
    movieToEditId: '',
    editedMovieInfo: {},
    msg: null,
    isChangesSaved: false
  };
  handleIdChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      editedMovieInfo: {}
    });
  };

  handleChange = e => {
    this.setState({
      editedMovieInfo : {...this.state.editedMovieInfo, [e.target.id]: e.target.value },
    });

  };

   handleSubmit = e => {
    e.preventDefault();
    clearErrors();
     const editedMovie = this.state.editedMovieInfo;
     editedMovie.id = this.state.movieToEditId
    this.props.editMovie(editedMovie)

     this.setState({
       editedMovieInfo: {},
       isChangesSaved: true
     });
   };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'EDIT_MOVIE_FAIL') {
        this.setState({ msg: error.msg || 'Changes haven\'t been saved!', isChangesSaved: false });
      } else {
        this.setState({ msg: 'null',
          isChangesSaved: true });
      }
    }
  }

  onDismissSuccessAlert = () => {
    this.setState({
      isChangesSaved: false
    })
  }

  onDismissErrorAlert = () => {
    this.setState({
      msg: false
    })
  }

  render() {
    const { movies } = this.props.movies;
    const {movieToEditId, isChangesSaved, msg} = this.state;
    const movieToEdit = movies.filter(movie => movieToEditId == movie.id)[0]

    return (
      <>
        <Alert isOpen={msg}  toggle={this.onDismissErrorAlert} color="danger">{this.state.msg}</Alert>

        <Alert  isOpen={isChangesSaved && !msg} toggle={this.onDismissSuccessAlert} color="primary">Changes saved successfully!</Alert>
        <Input defaultValue=''
          required
          className="mb-3"
          type="select"
          id='movieToEditId'
          onChange={this.handleIdChange}
        >
          <option value=""  disabled>
            select movie to edit
          </option>
          <Options items={movies} />
        </Input>
        {movieToEdit? <EditMovieForm
                    movieToEdit={movieToEdit}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} /> : null}
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
export default connect(mapStateToProps, { editMovie })(withMenu(EditMovieContainer, MOVIES_MENU_ITEMS));