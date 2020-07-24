import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { editCinemaHall } from '../actions/cinemaHallAction';
import { getSeatTypes } from '../../seatType/actions/seatTypeAction';
import NewHallFormForExistingCinema from './NewHallFormForExistingCinema';

class EditCinemaHallContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      schema: [{ numberOfSeats: '', seatsType: '' }],
      message: null,
      isChangesSaved: false,
    };
  }

  componentDidMount() {
    this.props.getSeatTypes();
    const hallId = +this.props.match.params.hallId;
    const { schema, title } = this.props.cinemaHalls.find(cinemaHall => cinemaHall.id === hallId);
    this.setState({
      title,
      schema,
    });
  }

  handleTitleChange = e => {
    this.setState({
      title: e.target.value,
    });
  };

  handleAddRow = () => {
    const { schema } = this.state;
    this.setState({
      schema: schema.concat([{ numberOfSeats: '', seatsType: '' }]),
    });
  };

  handleRemoveRow = stateIndex => () => {
    const { schema } = this.state;
    this.setState({
      schema: schema.filter((s, index) => index !== stateIndex),
    });
  };

  handleNumberOfSeatsChange = stateRowIndex => e => {
    const { schema } = this.state;
    const newSchema = schema.map((row, rowIndex) => {
      if (stateRowIndex !== rowIndex) return row;
      return { ...row, numberOfSeats: e.target.value };
    });
    this.setState({
      schema: newSchema,
    });
  };

  handleSeatsTypeChange = stateRowIndex => e => {
    const { schema } = this.state;
    const newSchema = schema.map((row, rowIndex) => {
      if (stateRowIndex !== rowIndex) return row;
      return { ...row, seatsType: e.target.value };
    });
    this.setState({
      schema: newSchema,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const cinemaId = this.props.match.params.id;
    const id = this.props.match.params.hallId;
    const { title, schema } = this.state;
    const editedHall = {
      id,
      title,
      schema,
      cinemaId,
    };

    this.props.editCinemaHall(editedHall);

    this.setState({
      isChangesSaved: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'EDIT_CINEMA_HALL_FAIL') {
        this.setState({
          message: error.message || "Changes haven't been saved!",
          isChangesSaved: false,
        });
      } else {
        this.setState({ message: 'null', isChangesSaved: true });
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
      message: false,
    });
  };

  render() {
    const { seatsTypes } = this.props;
    const { schema, title, isChangesSaved, message } = this.state;

    return (
      <>
        <Alert isOpen={message} toggle={this.onDismissErrorAlert} color="danger">
          {message}
        </Alert>

        <Alert
          isOpen={isChangesSaved && !message}
          toggle={this.onDismissSuccessAlert}
          color="primary"
        >
          Changes saved successfully!
        </Alert>
        <h3>edit hall</h3>
        <NewHallFormForExistingCinema
          seatsTypes={seatsTypes}
          schema={schema}
          title={title}
          handleAddRow={this.handleAddRow}
          handleTitleChange={this.handleTitleChange}
          handleRemoveRow={this.handleRemoveRow}
          handleNumberOfSeatsChange={this.handleNumberOfSeatsChange}
          handleSeatsTypeChange={this.handleSeatsTypeChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

EditCinemaHallContainer.propTypes = {
  editCinemaHall: PropTypes.func.isRequired,
  getSeatTypes: PropTypes.func.isRequired,
  seatsTypes: PropTypes.object,
};

const mapStateToProps = state => ({
  error: state.rootReducer.error,
  seatsTypes: state.rootReducer.seatType.seatTypes,
  cinemaHalls: state.rootReducer.cinemaHall.cinemaHalls,
});

export default connect(mapStateToProps, { editCinemaHall, getSeatTypes })(EditCinemaHallContainer);
