import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCinemaHall } from '../actions/cinemaHallAction';
import { getSeatTypes } from '../../seatType/actions/seatTypeAction';
import NewHallFormForExistingCinema from './NewHallFormForExistingCinema';

class AddCinemaHallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      schema: [{ numberOfSeats: '', seatsType: '' }],
    };
  }

  componentDidMount() {
    this.props.getSeatTypes();
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
    const { title, schema } = this.state;
    const newHall = {
      title,
      schema,
      cinemaId,
    };
    this.props.addCinemaHall(newHall);
  };

  render() {
    const { schema } = this.state;
    const { seatsTypes } = this.props;
    return (
      <>
        <h3>add hall</h3>
        <NewHallFormForExistingCinema
          seatsTypes={seatsTypes}
          schema={schema}
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

AddCinemaHallContainer.propTypes = {
  addCinamaHall: PropTypes.func.isRequired,
  getSeatTypes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.rootReducer.error,
  seatsTypes: state.rootReducer.seatType.seatTypes,
});
export default connect(mapStateToProps, { addCinemaHall, getSeatTypes })(AddCinemaHallContainer);
