import React, { Component } from 'react';
import {
  Button,
  Container,
  Input,
  Label,
  FormGroup,
  Form,
  Table,
  ModalHeader,
  ModalFooter,
  Modal,
} from 'reactstrap';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import moment from 'moment';
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
    const {
      cinemaHalls,
      movies,
      movieTimes,
      dateRange,
      cinemaHallId,
      movieId,
      time,
      isDeleteModalOpen,
    } = this.props;
    const timesItems = Array.from(new Set(movieTimes.map(item => item.time))).map(time => (
      <option value={time}>{time.slice(0, -3)}</option>
    ));

    let filteredMovieTimes = [...movieTimes];

    filteredMovieTimes = movieId
      ? filteredMovieTimes.filter(movieTime => +movieId === movieTime.movieId)
      : [...filteredMovieTimes];

    filteredMovieTimes = cinemaHallId
      ? filteredMovieTimes.filter(movieTime => +cinemaHallId === movieTime.cinemaHallId)
      : [...filteredMovieTimes];

    filteredMovieTimes =
      dateRange.startDate && dateRange.endDate
        ? filteredMovieTimes.filter(
            movieTime =>
              new Date(movieTime.date).setHours(0, 0, 0, 0) >= dateRange.startDate &&
              new Date(movieTime.date).setHours(0, 0, 0, 0) <= dateRange.endDate
          )
        : [...filteredMovieTimes];

    filteredMovieTimes = time
      ? filteredMovieTimes.filter(movieTime => time == movieTime.time)
      : [...filteredMovieTimes];

    return (
      <Container>
        <Form onSubmit={this.props.toggleDeleteModal}>
          <FormGroup>
            <h2>delete movie sessions for cinema</h2>
            <Label htmlFor="movieId">movie</Label>
            <Input
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
            <Input className="mb-3" type="select" id="time" onChange={this.props.handleChange}>
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
            <Button color="primary" disabled={!filteredMovieTimes.length}>
              delete
            </Button>
          </FormGroup>
        </Form>
        {filteredMovieTimes.length ? (
          <Table>
            <thead>
              <tr>
                <th>date</th>
                <th>movie</th>
                <th>time</th>
                <th>hall</th>
              </tr>
            </thead>
            {filteredMovieTimes.map(movieTime => (
              <tr>
                <td>{moment(movieTime.date).format('DD.MM.YYYY')}</td>
                <td>{movies.find(movie => +movie.id === movieTime.movieId).title}</td>
                <td>{movieTime.time.slice(0, -3)}</td>
                <td>
                  {cinemaHalls.find(cinemaHall => +cinemaHall.id === movieTime.cinemaHallId).title}
                </td>
              </tr>
            ))}
          </Table>
        ) : null}

        <Modal isOpen={isDeleteModalOpen} toggle={this.props.toggleDeleteModal}>
          <ModalHeader>
            {filteredMovieTimes.length === 1
              ? 'Are you sure you want to delete session?'
              : `Are you sure you want to delete ${filteredMovieTimes.length} sessions?`}
          </ModalHeader>
          <ModalFooter>
            {' '}
            <Button onClick={this.props.handleSubmit(filteredMovieTimes)} color="danger">
              delete
            </Button>{' '}
            <Button onClick={this.props.toggleDeleteModal} color="primary">
              cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
export default DeleteMovieTimeForm;
