import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class DeleteCinema extends Component {
  render() {
    let { cinemas } = this.props.cinemas;

    return (
      <>
        {this.props.cinemas.loading ? (
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
        <CardImg
          height="150px"
          src={
            cinema.photo
              ? cinema.photo
              : 'https://i.pinimg.com/originals/8a/eb/d8/8aebd875fbddd22bf3971c3a7159bdc7.png'
          }
        />
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
