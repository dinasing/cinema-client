import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import HallSchema from './HallSchema';
import { getSeatTypes } from '../../seatType/actions/seatTypeAction';
import { deleteCinemaHall } from '../actions/cinemaHallAction';

class CinemaHallContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleteModalOpen: false,
    };
  }

  componentDidMount() {
    this.props.getSeatTypes();
  }

  toggleDeleteModal = hallIdToDelete => () => {
    this.setState(prevState => ({
      isDeleteModalOpen: !prevState.isDeleteModalOpen,
      hallIdToDelete,
    }));
  };

  cancelModal = () => {
    this.setState({
      isDeleteModalOpen: false,
      hallIdToDelete: null,
    });
  };

  deleteCinemaHallHandle = () => {
    const hallId = this.state.hallIdToDelete;

    this.props.deleteCinemaHall(hallId);
    this.setState({
      isDeleteModalOpen: false,
      hallIdToDelete: '',
    });
  };

  render() {
    let { cinemaHalls } = this.props.cinemaHalls;
    const { seatTypes } = this.props.seatsTypes;
    const cinemaId = this.props.match.params.id;
    const { isDeleteModalOpen } = this.state;
    cinemaHalls = cinemaHalls.filter(hall => this.props.match.params.id == hall.cinemaId);
    const cinemaHallsComponent = cinemaHalls.map(hall => {
      return (
        <>
          <p>
            hall {hall.title} <Link onClick={this.toggleDeleteModal(hall.id)}>delete</Link>
          </p>
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
          <Modal isOpen={isDeleteModalOpen} toggle={this.toggleDeleteModal}>
            <ModalHeader>Are you sure you want to delete cinema hall?</ModalHeader>
            <ModalFooter>
              {' '}
              <Button onClick={this.deleteCinemaHallHandle} color="danger">
                delete
              </Button>{' '}
              <Button onClick={this.cancelModal} color="primary">
                cancel
              </Button>
            </ModalFooter>
          </Modal>
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
export default connect(mapStateToProps, { getSeatTypes, deleteCinemaHall })(CinemaHallContainer);
