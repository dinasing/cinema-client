import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Input } from 'reactstrap';
import { Options } from '../../common/components/Options';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { editCinema } from '../actions/cinemaAction';
import { clearErrors } from '../../common/actions/errorAction';
import EditCinemaForm from './EditCinemaForm';

class EditCinemaContainer extends Component {
  static propTypes = {
    cinemas: PropTypes.object,
    editCinema: PropTypes.func,
  };

  state = {
    cinemaToEditId: '',
    editedCinemaInfo: {},
    msg: null,
    isChangesSaved: false,
  };
  handleIdChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      editedCinemaInfo: {},
    });
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
    editedCinema.id = this.state.cinemaToEditId;
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
    const { cinemas } = this.props.cinemas;
    const { cinemaToEditId, isChangesSaved, msg } = this.state;
    const cinemaToEdit = cinemas.filter(cinema => cinemaToEditId == cinema.id)[0];
    return (
      <>
        <Alert isOpen={msg} toggle={this.onDismissErrorAlert} color="danger">
          {msg}
        </Alert>

        <Alert isOpen={isChangesSaved && !msg} toggle={this.onDismissSuccessAlert} color="primary">
          Changes saved successfully!
        </Alert>
        <h2>edit movie theater</h2>
        <Input
          defaultValue=""
          required
          className="mb-3"
          type="select"
          id="cinemaToEditId"
          onChange={this.handleIdChange}
        >
          <option value="" disabled>
            select movie theater to edit
          </option>
          <Options items={cinemas} />
        </Input>
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
  withMenu(EditCinemaContainer, CINEMAS_MENU_ITEMS)
);
