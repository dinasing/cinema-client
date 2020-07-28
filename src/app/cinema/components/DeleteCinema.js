import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class DeleteCinema extends Component {
  render() {
    const { cinemas, loading } = this.props.cinemas;

    return (
      <>
        {loading ? (
          <p>Loading cinemas ...</p>
        ) : (
          <CinemaListWithDelete cinemas={cinemas} deleteCinema={this.props.deleteCinema} />
        )}
      </>
    );
  }
}

export const CinemaListWithDelete = props => {
  const cinemas = props.cinemas.map(cinema => (
    <Card key={cinema.id}>
      <Row xs="4">
        <Col>
          <CardImg src={cinema.photo ? cinema.photo : null} />
        </Col>
        <Col>
          <CardBody>
            <CardTitle>
              <Link to={'/movie-theaters/' + cinema.id}>{cinema.title}</Link>
            </CardTitle>
            <Button onClick={() => props.deleteCinema(cinema.id)} color="danger">
              delete
            </Button>
          </CardBody>
        </Col>
      </Row>
    </Card>
  ));
  return cinemas;
};
