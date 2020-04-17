/* eslint-disable */
'use strict';
import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';

class NewSitTypeForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    cinemas: [],
    title: '',
    numberOfPeople: '',
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'ADD_SIT_TYPE_FAIL') {
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
            <h2>add new type of sits for cinema</h2>
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
            <Button>add type</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default NewSitTypeForm;
