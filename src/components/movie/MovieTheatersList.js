import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCinemas } from '../../app/actions/cinemaAction';
import { Link } from 'react-router-dom';

export class MovieTheaters extends Component {
  componentDidMount() {
    this.props.getCinemas();
  }
  render() {
    const { cinemas } = this.props.cinemas;
    return (
      <>
        <h2>Movie theaters</h2>
        {this.props.cinemas.loading ? (
          <p>Loading cinemas ...</p>
        ) : (
          cinemas.map(cinema => {
            return (
              <div key={cinema.id}>
                <Link to={cinema.title + cinema.id}> {cinema.title}</Link>
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
  cinemas: PropTypes.object,
};
const mapStateToProps = state => ({
  cinemas: state.rootReducer.cinema,
});
export default connect(mapStateToProps, { getCinemas })(MovieTheaters);
