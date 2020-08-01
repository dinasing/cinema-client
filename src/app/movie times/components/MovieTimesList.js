import React, { Component } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Badge,
  Row,
  Col,
  UncontrolledTooltip,
  Container,
} from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

class MovieTimesList extends Component {
  componentDidMount() {}
  render() {
    const { movieTimes } = this.props;

    const MovieTimesCards = movieTimes.map(movieTime => <MovieTimeCard movieTime={movieTime} />);

    return (
      <div>
        <br />
        Movie sessions
        {MovieTimesCards}
      </div>
    );
  }
}

const MovieTimeCard = props => {
  const { date, cinemas } = props.movieTime;
  const cinemasMovieTimes = cinemas.map(cinema => <CinemasMovieTimes cinema={cinema} />);

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <CardText>{moment(date).format('DD.MM.YYYY')}</CardText>
            </Col>
            <Col>{cinemasMovieTimes}</Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

function sortByTime(array) {
  return array.sort((a, b) => (a.time > b.time ? 1 : -1));
}

function sortByPrice(array) {
  return array.sort((a, b) => (a.price > b.price ? 1 : -1));
}

const CinemasMovieTimes = props => {
  const { movieTimes, title, cinemaId } = props.cinema;

  const timesBadges = sortByTime(movieTimes).map(movieTime => (
    <>
      {' '}
      <Badge id={`movieTime${movieTime.id}`}> {movieTime.time.slice(0, -3)}</Badge>
      <UncontrolledTooltip placement="right" target={`movieTime${movieTime.id}`}>
        {sortByPrice(movieTime.prices)[0].price}
      </UncontrolledTooltip>
    </>
  ));

  return (
    <Row>
      <Col>
        <Link to={`/movie-theatres/${cinemaId}`}>{title}</Link>
      </Col>
      <Col>{timesBadges}</Col>
    </Row>
  );
};

export default MovieTimesList;
