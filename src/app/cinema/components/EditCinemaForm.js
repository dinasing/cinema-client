import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';

export default class EditCinema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      city: '',
      address: '',
      description: '',
      photo: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.cinemaToEdit.title !== prevProps.cinemaToEdit.title) {
      this.setState({
        title: this.props.cinemaToEdit.title,
        city: this.props.cinemaToEdit.city,
        address: this.props.cinemaToEdit.address,
        description: this.props.cinemaToEdit.description,
        photo: this.props.cinemaToEdit.photo,
      });
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.cinemaToEdit.title,
      city: this.props.cinemaToEdit.city,
      address: this.props.cinemaToEdit.address,
      description: this.props.cinemaToEdit.description,
      photo: this.props.cinemaToEdit.photo,
    });
  }

  render() {
    return (
      <>
        <Form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="title"
              defaultValue={this.state.title}
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="city">city</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="city"
              defaultValue={this.state.city}
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="address">address</Label>
            <Input
              className="mb-3"
              type="text"
              id="address"
              defaultValue={this.state.address}
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="description">description</Label>
            <Input
              className="mb-3"
              type="text"
              id="description"
              defaultValue={this.state.description}
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="photo">photo</Label>
            <Input
              className="mb-3"
              type="text"
              id="photo"
              defaultValue={this.state.photo}
              onChange={this.props.handleChange}
              placeholder=""
            />

            <Button color="primary">save cinema</Button>
          </FormGroup>
        </Form>
      </>
    );
  }
}
