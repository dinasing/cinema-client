import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCinemas } from '../actions/cinemaAction';
import { Link } from 'react-router-dom';
import NewCinemaForm from './NewCinemaForm';
import { getSitTypes } from '../../sitType/actions/sitTypeAction';

export class MovieTheaters extends Component {
  componentDidMount() {
    this.props.getSitTypes();
    this.props.getCinemas();
  }

  render() {
    const { cinemas } = this.props.cinemas;
    return (
      <>
        <NewCinemaForm sitsTypes={this.props.sitsTypes} />

        <h2>Movie theaters</h2>
        {this.props.cinemas.loading ? (
          <p>Loading cinemas ...</p>
        ) : (
            cinemas.map(cinema => {
              return (
                <div key={cinema.id}>
                  <Link to={'/movie-theaters/' + cinema.id}> {cinema.title}</Link>
                </div>
              );
            })
          )}
      </>
    );
  }
}

MovieTheaters.propTypes = {
  getCinemas: PropTypes.func.isRequired,
  getSitTypes: PropTypes.func.isRequired,
  cinemas: PropTypes.object,
};

const mapStateToProps = state => ({
  cinemas: state.rootReducer.cinema,
  sitsTypes: state.rootReducer.sitType.sitsTypes,
});

export default connect(mapStateToProps, { getCinemas, getSitTypes })(MovieTheaters);
