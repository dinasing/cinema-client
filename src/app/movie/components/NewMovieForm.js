import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';
import { addMovie } from '../actions/movieAction';
import { clearErrors } from '../../common/actions/errorAction';

class NewMovieForm extends Component {
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

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'ADD_MOVIES_FAIL' ? error.message.message : null });
    }
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

  render() {
    return (
      <Container>
        {this.state.message ? <Alert color="warning">{this.state.message}</Alert> : null}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h2>add new movie</h2>
            <Label htmlFor="title">title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="title"
              onChange={this.handleChange}
              placeholder=""
            />
            <Label htmlFor="release_date">from</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="release_date"
              onChange={this.handleChange}
              placeholder="DD.MM.YYYY"
            />

            <Label htmlFor="end_date">to</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="end_date"
              onChange={this.handleChange}
              placeholder="DD.MM.YYYY"
            />

            <Label htmlFor="genre">genre</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="genre"
              onChange={this.handleChange}
              placeholder=""
            />

            <Label htmlFor="poster">link to poster</Label>
            <Input
              className="mb-3"
              type="text"
              id="poster"
              onChange={this.handleChange}
              placeholder=""
            />
            <Label htmlFor="description">description</Label>
            <Input
              className="mb-3"
              type="text"
              id="description"
              onChange={this.handleChange}
              placeholder=""
            />
            <Label htmlFor="language">language</Label>
            <Input
              className="mb-3"
              type="text"
              id="language"
              onChange={this.handleChange}
              placeholder=""
            />
            <Button>add movie</Button>
          </FormGroup>
        </Form>
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

export default connect(mapStateToProps, { addMovie, clearErrors })(NewMovieForm);
