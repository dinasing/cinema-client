import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovies } from '../../app/actions/movieAction';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export class MovieTheaters extends Component {
  componentDidMount() {
    this.props.getMovies();
  }
  render() {
    const { movies } = this.props.movies;
    return (
      <>
        <h2>Movies</h2>
        {this.props.movies.loading ? (
          <p>Loading movies ...</p>
        ) : (
          movies.map(movie => {
            return (
              <div key={movie.id}>
                <Card>
                  <CardImg src={movie.poster}></CardImg>
                  <CardBody>
                    <CardTitle>
                      <Link to={'/movies/' + movie.id}> {movie.title}</Link>
                    </CardTitle>
                    <CardText>{movie.release_date + ' - ' + movie.end_date}</CardText>
                  </CardBody>
                </Card>
              </div>
            );
          })
        )}
      </>
    );
  }
}
MovieTheaters.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.object,
};
const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
});
export default connect(mapStateToProps, { getMovies })(MovieTheaters);
