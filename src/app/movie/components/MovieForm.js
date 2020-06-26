/* eslint-disable */
import React, { Component } from 'react';
import { addMovie } from '../actions/movieAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';
import { MOVIES_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { withMenu } from '../../menu/withMenu';

class MovieForm extends Component {

  render() {
    return (
      <Container>
        <Form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="title"
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="release_date">from</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="release_date"
              onChange={this.props.handleChange}
              placeholder="DD.MM.YYYY"
            />

            <Label htmlFor="end_date">to</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="end_date"
              onChange={this.props.handleChange}
              placeholder="DD.MM.YYYY"
            />

            <Label htmlFor="genre">genre</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="genre"
              onChange={this.props.handleChange}
              placeholder=""
            />

            <Label htmlFor="poster">link to poster</Label>
            <Input
              className="mb-3"
              type="text"
              id="poster"
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="description">description</Label>
            <Input
              className="mb-3"
              type="text"
              id="description"
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Label htmlFor="language">language</Label>
            <Input
              className="mb-3"
              type="text"
              id="language"
              onChange={this.props.handleChange}
              placeholder=""
            />
            <Button color="primary">save movie</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default MovieForm;
