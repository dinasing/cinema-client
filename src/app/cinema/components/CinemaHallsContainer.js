import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import HallSchema from './HallSchema';

class CinemaHallContainer extends Component {
  render() {
    let { cinemaHalls } = this.props.cinemaHalls;
    cinemaHalls = cinemaHalls.filter(hall => this.props.match.params.id == hall.cinemaId);
    const cinemaHallsComponent = cinemaHalls.map(hall => {
      return (
        <>
          <h4>hall {hall.title}</h4>
          <HallSchema schema={hall.schema} />
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
  cinemaHalls: PropTypes.object,
};
const mapStateToProps = state => ({
  cinemaHalls: state.rootReducer.cinemaHall,
});
export default connect(mapStateToProps)(withMenu(CinemaHallContainer, CINEMAS_MENU_ITEMS));
