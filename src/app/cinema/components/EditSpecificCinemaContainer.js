import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
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
    msg: null,
    isChangesSaved: false,
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
      isChangesSaved: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'EDIT_CINEMA_FAIL') {
        this.setState({ msg: error.msg || "Changes haven't been saved!", isChangesSaved: false });
      } else {
        this.setState({ msg: 'null', isChangesSaved: true });
      }
    }
  }

  componentDidMount() {
    this.setState({
      cinemaToEdit: this.props.cinemas.cinema,
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
    const { isChangesSaved, msg, cinemaToEdit } = this.state;

    return (
      <>
        <Alert isOpen={msg} toggle={this.onDismissErrorAlert} color="danger">
          {msg}
        </Alert>

        <Alert isOpen={isChangesSaved && !msg} toggle={this.onDismissSuccessAlert} color="primary">
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
export default connect(mapStateToProps, { editCinema })(EditSpecificCinemaContainer);
