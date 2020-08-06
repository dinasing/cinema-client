import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { Options } from '../../common/components/Options';

class DeleteMovieTimeForm extends Component {
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({
        message: error.id === 'DELETE_MOVIE_TIME_FAIL' ? error.message.message : null,
      });
    }
  }

  render() {
    const { cinemaHalls, movies, dateRange, times } = this.props;
    const timesItems = Array.from(new Set(times.map(item => item.time))).map(time => (
      <option>{time.slice(0, -3)}</option>
    ));

    return (
      <Container>
        <Form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <h2>delete movie sessions for cinema</h2>
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
              <Options items={movies} />
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
              type="select"
              id="time"
              onChange={this.props.handleChange}
            >
              <option value="" selected disabled>
                select time
              </option>
              {timesItems}
            </Input>
            <Label htmlFor="dateRange">date</Label>
            <br />
            <DateRange
              id="dateRange"
              ranges={[dateRange]}
              onChange={this.props.handleDateRangeChange}
              moveRangeOnFirstSelection={false}
            />
            <br />
            <Button color="primary">delete</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default DeleteMovieTimeForm;
