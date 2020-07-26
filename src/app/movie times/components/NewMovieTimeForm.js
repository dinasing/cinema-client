import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { Options } from '../../common/components/Options';

class NewMovieTimeForm extends Component {
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

  createSeatsTypesOptions(seatsTypes, cinemaHalls, cinemaHallId) {
    const cinemaHall = cinemaHalls.filter(cinemaHall => cinemaHall.id == cinemaHallId)[0];
    let cinemaHallSeatsTypes = new Set();
    for (const row of cinemaHall.schema) {
      cinemaHallSeatsTypes.add(Number(row.seatsType));
    }

    return seatsTypes.filter(seatsType => cinemaHallSeatsTypes.has(seatsType.id));
  }

  render() {
    const cinemaHalls = this.createCinemaHallOptions(this.props.cinemaHalls, this.props.cinemaId);
    const seatsTypes = this.props.cinemaHallId
      ? this.createSeatsTypesOptions(
          this.props.seatsTypes,
          this.props.cinemaHalls,
          this.props.cinemaHallId
        )
      : [];

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
              onChange={this.props.handleCinemaHallIdChange}
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
            <Label htmlFor="dateRange">date</Label>
            <br />
            <DateRange
              id="dateRange"
              ranges={[this.props.dateRange]}
              onChange={this.props.handleDateRangeChange}
              moveRangeOnFirstSelection={false}
            />
            <br />
            {seatsTypes.map(seatsType => {
              return (
                <div key={seatsType.id}>
                  <Label htmlFor={seatsType.id}>price ({seatsType.title})</Label>
                  <Input
                    className="mb-3"
                    type="number"
                    id={seatsType.id}
                    min="0"
                    defaultValue="0"
                    onChange={this.props.handleSeatsTypePriceChange(seatsType.id)}
                  />
                </div>
              );
            })}
            <Button color="primary">save</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default NewMovieTimeForm;
