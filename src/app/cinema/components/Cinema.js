import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import { getCinemaById, getMovieTimes, deleteCinema } from '../actions/cinemaAction';
import { getCinemaHalls } from '../actions/cinemaHallAction';
import MovieTimesList from '../../movie times/components/MovieTimesList';

class MovieTheater extends Component {
  state = {
    isCinemaDeleted: false,
    isDeleteModalOpen: false,
  };

  componentDidMount() {
    this.props.getCinemaById(this.props.match.params.id);
    this.props.getMovieTimes(this.props.match.params.id);
    this.props.getCinemaHalls();
  }

  toggleDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: !this.state.isDeleteModalOpen,
    });
  };

  deleteCinemaHandle = () => {
    const cinemaId = this.props.match.params.id;

    this.props.deleteCinema(cinemaId);
    this.setState({
      isCinemaDeleted: true,
    });
  };
  render() {
    const { cinema, movieTimes } = this.props.cinemas;

    if (this.state.isCinemaDeleted) return <Redirect to="/movie-theaters" />;
    return (
      <>
        <h2>
          {cinema.title}{' '}
          <small>
            <Link to={'/movie-theaters/' + cinema.id + '/edit/'}>edit</Link>
          </small>{' '}
          <small>
            <Link onClick={this.toggleDeleteModal}>delete</Link>
          </small>{' '}
          <small>
            <Link to={'/movie-theaters/' + cinema.id + '/halls/'}>halls</Link>
          </small>{' '}
          <small>
            <Link to={'/movie-theaters/' + cinema.id + '/additional-goods/'}>additional goods</Link>
          </small>
          <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
            <ModalHeader>Are you sure you want to delete cinema "{cinema.title}"</ModalHeader>
            <ModalFooter>
              {' '}
              <Button onClick={this.deleteCinemaHandle} color="danger">
                delete
              </Button>{' '}
              <Button onClick={this.toggleDeleteModal} color="primary">
                cancel
              </Button>
            </ModalFooter>
          </Modal>
        </h2>
        <small>{cinema.description}</small>
        <p>
          {cinema.city}, {cinema.address}
        </p>
        <h5>
          Movie sessions{' '}
          <small>
            <Link to={'/movie-theaters/' + cinema.id + '/add-movie-session/'}>add</Link>
          </small>{' '}
          <small>
            <Link to={'/movie-theaters/' + cinema.id + '/delete-movie-session/'}>delete</Link>
          </small>
        </h5>
        {movieTimes.length ? (
          <MovieTimesList movieTimes={movieTimes} />
        ) : this.props.cinemas.movieTimesLoading ? (
          'Loading ...'
        ) : (
          'There are no movie times for the "' + cinema.title + '" right now.'
        )}
      </>
    );
  }
}

MovieTheater.propTypes = {
  getCinemaById: PropTypes.func.isRequired,
  getMovieTimes: PropTypes.func.isRequired,
  getCinemaHalls: PropTypes.func.isRequired,
  cinemas: PropTypes.object,
};
const mapStateToProps = state => ({
  cinemas: state.rootReducer.cinema,
});
export default connect(mapStateToProps, {
  getCinemaById,
  getMovieTimes,
  getCinemaHalls,
  deleteCinema,
})(MovieTheater);
