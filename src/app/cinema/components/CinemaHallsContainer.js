import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import HallSchema from './HallSchema';
import { getSitTypes } from '../../sitType/actions/sitTypeAction';

class CinemaHallContainer extends Component {
  componentDidMount() {
    this.props.getSitTypes();
  }

  render() {
    let { cinemaHalls } = this.props.cinemaHalls;
    const { sitsTypes } = this.props.sitsTypes;
    cinemaHalls = cinemaHalls.filter(hall => this.props.match.params.id == hall.cinemaId);
    const cinemaHallsComponent = cinemaHalls.map(hall => {
      return (
        <>
          <p>hall {hall.title}</p>
          <HallSchema schema={hall.schema} hallTitle={hall.title} />
          <p>
            sits types:{' '}
            <p>
              {sitsTypes.map(sitsType => (
                <>
                  {sitsType.id} - {sitsType.title}{' '}
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
  sitsTypes: PropTypes.object.isRequired,
  getSitTypes: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  cinemaHalls: state.rootReducer.cinemaHall,
  sitsTypes: state.rootReducer.sitType,
});
export default connect(mapStateToProps, { getSitTypes })(
  withMenu(CinemaHallContainer, CINEMAS_MENU_ITEMS)
);
