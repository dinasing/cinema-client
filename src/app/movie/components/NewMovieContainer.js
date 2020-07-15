/* eslint-disable */
import React, { Component } from 'react';
import { addMovie } from '../actions/movieAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../common/actions/errorAction';
import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';
import MovieForm from './MovieForm';

class NewMovieContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    title: '',
    release_date: '',
    end_date: '',
    genre: '',
    description: '',
    poster: '',
    language: '',
    msg: null,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ msg: null });
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
      if (error.id === 'ADD_MOVIES_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <Container>
        {this.state.msg ? <Alert color="warning">{this.state.msg}</Alert> : null}

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

export default connect(mapStateToProps, { addMovie, clearErrors })(NewMovieContainer);
