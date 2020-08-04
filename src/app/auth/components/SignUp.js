import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';
import { clearErrors } from '../../common/actions/errorAction';
import { register } from '../actions/authAction';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({
        message: error.id === 'REGISTER_FAIL' ? error.message.message : null,
      });
    }
  }

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

  render() {
    return (
      <Container>
        {this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
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
