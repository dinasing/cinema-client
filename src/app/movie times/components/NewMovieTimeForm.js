/* eslint-disable */
'use strict';
import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';
import { Options } from '../../common/components/Options';

class NewMovieTimeForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'ADD_MOVIE_TIME_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  createCinemaHallOptions(cinemaHalls, cinemaId) {
    return cinemaHalls.filter(cinemaHall => cinemaHall.cinemaId == cinemaId);
  }

  render() {
    const cinemaHalls = this.createCinemaHallOptions(this.props.cinemaHalls, this.props.cinemaId);
    return (
      <Container>
        <Form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <h2>add new movie time for cinema</h2>
            <Label htmlFor="movieId">movie</Label>
            <Input
              required
              className="mb-3"
              type="select"
              id="movieId"
              onChange={this.props.handleChange}
              placeholder=""
            >
              <option value="" selected disabled>
                select movie
              </option>
              <Options items={this.props.movies} />
            </Input>
            <Label htmlFor="cinemaId">movie theater</Label>
            <Input
              required
              className="mb-3"
              type="select"
              id="cinemaId"
              onChange={this.props.handleChange}
            >
              <option value="" selected disabled>
                select movie theater
              </option>
              <Options items={this.props.cinemas} />
            </Input>
            <Label htmlFor="cinemaHallId">hall</Label>
            <Input
              required
              className="mb-3"
              type="select"
              id="cinemaHallId"
              onChange={this.props.handleChange}
            >
              <option value="" selected disabled>
                select hall
              </option>
              <Options items={cinemaHalls} />
            </Input>
            <Label htmlFor="time">time</Label>
            <Input
              required
              className="mb-3"
              type="time"
              id="time"
              onChange={this.props.handleChange}
            />
            <Label htmlFor="date">date</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="date"
              onChange={this.props.handleChange}
            />
            <Button>add</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default NewMovieTimeForm;
