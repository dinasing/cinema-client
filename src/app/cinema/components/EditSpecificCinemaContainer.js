import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { editCinema } from '../actions/cinemaAction';
import { clearErrors } from '../../common/actions/errorAction';
import EditCinemaForm from './EditCinemaForm';

class EditSpecificCinemaContainer extends Component {
  static propTypes = {
    cinemas: PropTypes.object,
    editCinema: PropTypes.func,
  };

  state = {
    editedCinemaInfo: {},
    message: null,
    areChangesSaved: false,
  };

  handleChange = e => {
    this.setState({
      editedCinemaInfo: { ...this.state.editedCinemaInfo, [e.target.id]: e.target.value },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    clearErrors();
    const editedCinema = this.state.editedCinemaInfo;
    editedCinema.id = this.state.cinemaToEdit.id;
    this.props.editCinema(editedCinema);

    this.setState({
      editedCinemaInfo: {},
      areChangesSaved: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({
        message: error.id === 'EDIT_CINEMA_FAIL' ? "Changes haven't been saved!" : null,
        areChangesSaved: error.id !== 'EDIT_CINEMA_FAIL',
      });
    }
  }

  componentDidMount() {
    this.setState({
      cinemaToEdit: this.props.cinemas.cinema,
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
    const { areChangesSaved, message, cinemaToEdit } = this.state;

    return (
      <>
        <Alert isOpen={message} toggle={this.onDismissErrorAlert} color="danger">
          {message}
        </Alert>

        <Alert
          isOpen={areChangesSaved && !message}
          toggle={this.onDismissSuccessAlert}
          color="primary"
        >
          Changes saved successfully!
        </Alert>
        <h2>edit movie theater</h2>
        {cinemaToEdit ? (
          <EditCinemaForm
            cinemaToEdit={cinemaToEdit}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  cinemas: state.rootReducer.cinema,
  error: state.rootReducer.error,
});

export default connect(mapStateToProps, { editCinema })(
  withMenu(EditSpecificCinemaContainer, CINEMAS_MENU_ITEMS)
);
