import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import HallSchema from './HallSchema';
import { getSeatTypes } from '../../seatType/actions/seatTypeAction';

class CinemaHallContainer extends Component {
  componentDidMount() {
    this.props.getSeatTypes();
  }

  render() {
    const { cinemaHalls: allCinemaHalls } = this.props.cinemaHalls;
    const { seatsTypes } = this.props.seatsTypes;
    const cinemaHalls = allCinemaHalls.filter(
      hall => +this.props.match.params.id === hall.cinemaId
    );
    const cinemaHallsComponent = cinemaHalls.map(hall => {
      return (
        <>
          <p>hall {hall.title}</p>
          <HallSchema schema={hall.schema} hallTitle={hall.title} />
          <p>
            seats types:{' '}
            <p>
              {seatsTypes.map(seatsType => (
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
        <h3>cinema halls</h3>
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

export default connect(mapStateToProps, { getSeatTypes })(
  withMenu(CinemaHallContainer, CINEMAS_MENU_ITEMS)
);
