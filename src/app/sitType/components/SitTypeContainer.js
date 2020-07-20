import React, { Component } from 'react';
import { addSitType } from '../actions/sitTypeAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import NewSitTypeFrom from './NewSitTypeForm';

class SitTypeFormContainer extends Component {
  constructor(props) {
    super(props);
    this.
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: null });
    const { title, numberOfPeople } = this.state;
    const newSitType = {
      title,
      numberOfPeople,
    };
    this.props.addSitType(newSitType);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'ADD_SIT_TYPE_FAIL') {
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }
  }

  render() {
    return (
      <Container>
        {this.state.message ? <Alert color="warning">{this.state.message}</Alert> : null}
        <NewSitTypeFrom handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

SitTypeFormContainer.propTypes = {
  addSitType: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  sitType: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  sitType: state.rootReducer.sitType,
});

export default connect(mapStateToProps, { addSitType, clearErrors })(SitTypeFormContainer);
