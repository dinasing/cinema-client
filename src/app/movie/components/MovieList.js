import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  CardFooter,
} from 'reactstrap';
import moment from 'moment';
import { getMovies, deleteMovie, editMovie } from '../actions/movieAction';
import { withMenu } from '../../menu/withMenu';
import { MOVIES_MENU_ITEMS } from '../../menu/menuItemsConstants';

export const MovieCard = props => {
  const { poster, id, title, release_date, end_date } = props.movie;

  return (
    <Card>
      <CardImg
        height="70%"
        src={
          poster ? poster : 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Out_Of_Poster.jpg'
        }
      />
      <CardBody>
        <CardTitle>
          <Link to={'/movies/' + id}> {title}</Link>
        </CardTitle>
        <CardText>
          {moment(release_date).format('DD.MM.YYYY') +
            ' - ' +
            moment(end_date).format('DD.MM.YYYY')}
        </CardText>
      </CardBody>
    </Card>
  );
};

export const MovieCardWithDeleteButton = props => {
  const { poster, id, title, release_date, end_date } = props.movie;
  return (
    <Card>
      <CardImg
        height="65%"
        src={
          poster ? poster : 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Out_Of_Poster.jpg'
        }
      />
      <CardBody>
        <CardTitle>
          <Link to={'/movies/' + id}> {title}</Link>
        </CardTitle>
        <CardText>
          {moment(release_date).format('DD.MM.YYYY') +
            ' - ' +
            moment(end_date).format('DD.MM.YYYY')}
        </CardText>
      </CardBody>
      <CardFooter>
        <Button onClick={() => props.deleteMovie(id)} color="danger">
          delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export class MovieList extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  handleDelete = id => {
    this.props.deleteMovie(id);
  };

  movieList(CardComponent) {
    const { movies } = this.props.movies;
    return movies.map(movie => {
      return (
        <CardComponent
          movie={movie}
          key={movie.id}
          deleteMovie={() => this.handleDelete(movie.id)}
        />
      );
    });
  }

  render() {
    const CardComponent = this.props.CardComponent || MovieCard;

    return (
      <>
        <h2>Movies</h2>
        {this.props.movies.loading ? (
          <p>Loading movies ...</p>
        ) : this.props.movies.movies[0] ? (
          <Container>
            <Row lg="3" sm="2" xs="1">
              {this.movieList(CardComponent)}
            </Row>
          </Container>
        ) : (
          <p>There are no movies at the box office right now.</p>
        )}
      </>
    );
  }
}

MovieList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  movies: PropTypes.object,
};

const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
});

export default connect(mapStateToProps, { getMovies, deleteMovie, editMovie })(
  withMenu(MovieList, MOVIES_MENU_ITEMS)
);
