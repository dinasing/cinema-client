/* eslint-disable */
'use strict';
import React, { Component } from 'react';
import { addSeatType } from '../actions/seatTypeAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import NewSeatTypeFrom from './NewSeatTypeForm';

class SeatTypeFormContainer extends Component {
  state = {
    title: '',
    numberOfPeople: '1',
    msg: null,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ msg: null });
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
      if (error.id === 'ADD_SEAT_TYPE_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <Container>
        {this.state.msg ? <Alert color="warning">{this.state.msg}</Alert> : null}
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
