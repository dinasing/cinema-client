import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container, Label, Input, Form, FormGroup, Alert } from 'reactstrap';
import { login } from '../actions/authAction';
import { clearErrors } from '../../common/actions/errorAction';

class Login extends Component {
  constructor(props) {
    super(props);

    state = {
      email: '',
      password: '',
      message: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'LOGIN_FAIL' ? error.message.message : null });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    this.props.login(user);
  };

  render() {
    return (
      <Container>
        {this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h1>log in</h1>
            <Label htmlFor="email">email</Label>
            <Input
              className="mb-3"
              type="email"
              id="email"
              onChange={this.handleChange}
              placeholder=""
            />

            <Label htmlFor="password">password</Label>
            <Input
              className="mb-3"
              type="password"
              id="password"
              onChange={this.handleChange}
              placeholder=""
            />

            <Button>log in</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.auth.isAuthenticated,
  error: state.rootReducer.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
