/* eslint-disable */
import React, { Component } from 'react';
import { register } from '../../app/actions/authAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../app/actions/errorAction';
import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, email, password } = this.state;
    const newUser = { firstName, lastName, email, password };
    this.props.register(newUser);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <Container>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h1>sign up</h1>
            <Label htmlFor="firstName">first name</Label>
            <Input
              className="mb-3"
              type="text"
              id="firstName"
              onChange={this.handleChange}
              placeholder=""
            />

            <Label htmlFor="lastName">last name</Label>
            <Input
              className="mb-3"
              type="text"
              id="lastName"
              onChange={this.handleChange}
              placeholder=""
            />

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

            <Button>sign up</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
});

export default connect(mapStateToProps, { register, clearErrors })(SignUp);
