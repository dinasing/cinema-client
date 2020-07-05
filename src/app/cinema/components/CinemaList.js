import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCinemas } from '../actions/cinemaAction';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { Card, CardImg, CardBody, CardTitle, Col, Row } from 'reactstrap';

export class MovieTheaters extends Component {
  componentDidMount() {
    this.props.getCinemas();
  }
  render() {
    const { cinemas } = this.props.cinemas;
    return (
      <>
        <h2>movie theaters</h2>
        {this.props.cinemas.loading ? (
          <p>Loading cinemas ...</p>
        ) : (
          cinemas.map(cinema => {
            return (
              <Card key={cinema.id}>
                <Row xs="4">
                  <Col>
                    <CardImg src={cinema.photo ? cinema.photo : null} />
                  </Col>
                  <Col>
                    <CardBody>
                      <CardTitle>
                        <Link to={'/movie-theaters/' + cinema.id}> {cinema.title}</Link>
                      </CardTitle>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            );
          })
        )}
      </>
    );
  }
}
MovieTheaters.propTypes = {
  getCinemas: PropTypes.func.isRequired,
  cinemas: PropTypes.object,
};
const mapStateToProps = state => ({
  cinemas: state.rootReducer.cinema,
  sitsTypes: state.rootReducer.sitType.sitsTypes,
});
export default connect(mapStateToProps, { getCinemas })(
  withMenu(MovieTheaters, CINEMAS_MENU_ITEMS)
);
