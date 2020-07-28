import React, { Component } from 'react';
import { addSeatType } from '../actions/seatTypeAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import NewSeatTypeFrom from './NewSeatTypeForm';

class SeatTypeFormContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    title: '',
    numberOfPeople: '1',
    message: null,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: null });
    const { title, numberOfPeople } = this.state;
    const newSeatType = {
      title,
      numberOfPeople,
    };
    this.props.addSeatType(newSeatType);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'ADD_SEAT_TYPE_FAIL' ? error.message.message : null });
    }
  }

  render() {
    return (
      <Container>
        {this.state.message ? <Alert color="warning">{this.state.message}</Alert> : null}
        <NewSeatTypeFrom handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

SeatTypeFormContainer.propTypes = {
  addSeatType: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  seatType: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  seatType: state.rootReducer.seatType,
});

export default connect(mapStateToProps, { addSeatType, clearErrors })(SeatTypeFormContainer);
