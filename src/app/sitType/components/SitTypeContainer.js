import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { addSitType } from '../actions/sitTypeAction';
import { clearErrors } from '../../common/actions/errorAction';
import NewSitTypeFrom from './NewSitTypeForm';

class SitTypeFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      numberOfPeople: '1',
      message: null,
    };
  }

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
      const message = error.id === 'ADD_SIT_TYPE_FAIL' ? error.message.message : null;
      this.setState({ message });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

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
