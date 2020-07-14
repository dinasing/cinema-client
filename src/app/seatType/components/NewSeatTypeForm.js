'use strict';
import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';

class NewSeatTypeForm extends Component {
  state = {
    cinemas: [],
    title: '',
    numberOfPeople: '',
    msg: null,
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
        <Form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <h2>add new type of seats for cinemas</h2>
            <Label htmlFor="title">title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="title"
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="numberOfPeople">number of people</Label>
            <Input
              required
              className="mb-3"
              type="number"
              id="numberOfPeople"
              onChange={this.props.handleChange}
              defaultValue="1"
            />
            <Button color="primary">save type</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default NewSeatTypeForm;
