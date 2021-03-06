import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { getCinemaById, getMovieTimes } from '../actions/cinemaAction';

class MovieTheater extends Component {
  componentDidMount() {
    this.props.getCinemaById(this.props.match.params.id);
    this.props.getMovieTimes(this.props.match.params.id);
  }

  render() {
    const { cinema, movieTimes } = this.props.cinemas;

    return (
      <>
        <h2>{cinema.title}</h2>

        {movieTimes.length
          ? movieTimes.map(movieTime => {
            return (
              <div key={movieTime.id}>
                <Card>
                  <CardBody>
                    <CardTitle>{movieTime.date}</CardTitle>
                    <CardText>{movieTime.movie.title + '  ' + movieTime.time}</CardText>
                  </CardBody>
                </Card>
              </div>
            );
          })
          : this.props.cinemas.movieTimesLoading
            ? 'Loading ...'
            : 'There are no movie times for the "' + cinema.title + '" right now.'}
      </>
    );
  }
}

MovieTheater.propTypes = {
  getCinemaById: PropTypes.func.isRequired,
  getMovieTimes: PropTypes.func.isRequired,
  cinemas: PropTypes.object,
};

const mapStateToProps = state => ({
  cinemas: state.rootReducer.cinema,
});

export default connect(mapStateToProps, { getCinemaById, getMovieTimes })(MovieTheater);
