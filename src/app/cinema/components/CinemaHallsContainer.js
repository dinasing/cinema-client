import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HallSchema from './HallSchema';
import { getSeatTypes } from '../../seatType/actions/seatTypeAction';

class CinemaHallContainer extends Component {
  componentDidMount() {
    this.props.getSeatTypes();
  }

  render() {
    let { cinemaHalls } = this.props.cinemaHalls;
    const { seatTypes } = this.props.seatsTypes;
    const cinemaId = this.props.match.params.id;
    cinemaHalls = cinemaHalls.filter(hall => this.props.match.params.id == hall.cinemaId);
    const cinemaHallsComponent = cinemaHalls.map(hall => {
      return (
        <>
          <p>hall {hall.title}</p>
          <HallSchema schema={hall.schema} hallTitle={hall.title} />
          <p>
            seats types:{' '}
            <p>
              {seatTypes.map(seatsType => (
                <>
                  {seatsType.id} - {seatsType.title}{' '}
                </>
              ))}
            </p>
          </p>
        </>
      );
    });
    return (
      <>
        <h3>
          cinema halls{' '}
          <small>
            <Link to={'/movie-theaters/' + cinemaId + '/add-hall/'}>add hall</Link>
          </small>
        </h3>
        {cinemaHallsComponent}
      </>
    );
  }
}

CinemaHallContainer.propTypes = {
  cinemaHalls: PropTypes.object.isRequired,
  seatsTypes: PropTypes.object.isRequired,
  getSeatTypes: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  cinemaHalls: state.rootReducer.cinemaHall,
  seatsTypes: state.rootReducer.seatType,
});
export default connect(mapStateToProps, { getSeatTypes })(CinemaHallContainer);
