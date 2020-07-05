import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCinemaById, getMovieTimes } from '../actions/cinemaAction';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';

class MovieTheater extends Component {
  componentDidMount() {
    this.props.getCinemaById(this.props.match.params.id);
    this.props.getMovieTimes(this.props.match.params.id);
  }
  render() {
    const { cinema, movieTimes } = this.props.cinemas;
    return (
      <>
        <h2>
          {cinema.title}{' '}
          <small>
            <Link to={'/movie-theaters/' + cinema.id + '/edit/'}>edit</Link>
          </small>
        </h2>

        {movieTimes[0]
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
export default connect(mapStateToProps, { getCinemaById, getMovieTimes })(
  withMenu(MovieTheater, CINEMAS_MENU_ITEMS)
);
