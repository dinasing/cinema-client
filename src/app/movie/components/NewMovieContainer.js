import React, { Component } from 'react';
import { addMovie } from '../actions/movieAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Container, Alert } from 'reactstrap';
import { MOVIES_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { withMenu } from '../../menu/withMenu';
import MovieForm from './MovieForm';

class NewMovieContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      release_date: '',
      end_date: '',
      genre: '',
      description: '',
      poster: '',
      language: '',
      message: null,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: null });
    const { title, release_date, end_date, genre, description, poster, language } = this.state;
    const newMovie = {
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
    };
    this.props.addMovie(newMovie);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'ADD_MOVIES_FAIL' ? error.message.message : null });
    }
  }

  render() {
    return (
      <Container>
        {this.state.message ? <Alert color="warning">{this.state.message}</Alert> : null}

        <h2>add new movie</h2>
        <MovieForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  addMovie: state.rootReducer.func,
  movies: state.rootReducer.movie,
});

export default connect(mapStateToProps, { addMovie, clearErrors })(
  withMenu(NewMovieContainer, MOVIES_MENU_ITEMS)
);
