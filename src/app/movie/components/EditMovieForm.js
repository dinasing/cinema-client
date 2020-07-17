/* eslint-disable */
import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';

class EditMovieForm extends Component {
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
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.movieToEdit.title != prevProps.movieToEdit.title) {
      this.setState({
        title: this.props.movieToEdit.title,
        release_date: this.props.movieToEdit.release_date,
        end_date: this.props.movieToEdit.end_date,
        genre: this.props.movieToEdit.genre,
        description: this.props.movieToEdit.description,
        poster: this.props.movieToEdit.poster,
        language: this.props.movieToEdit.language,
      });
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.movieToEdit.title,
      release_date: this.props.movieToEdit.release_date,
      end_date: this.props.movieToEdit.end_date,
      genre: this.props.movieToEdit.genre,
      description: this.props.movieToEdit.description,
      poster: this.props.movieToEdit.poster,
      language: this.props.movieToEdit.language,
    });
  }
  render() {
    return (
      <Container>
        <Form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="title"
              defaultValue={this.state.title}
              onChange={this.props.handleChange}
            />
            <Label htmlFor="release_date">from</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="release_date"
              onChange={this.props.handleChange}
              defaultValue={this.state.release_date}
            />

            <Label htmlFor="end_date">to</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="end_date"
              onChange={this.props.handleChange}
              defaultValue={this.state.end_date}
            />

            <Label htmlFor="genre">genre</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="genre"
              onChange={this.props.handleChange}
              defaultValue={this.state.genre}
            />

            <Label htmlFor="poster">link to poster</Label>
            <Input
              className="mb-3"
              type="text"
              id="poster"
              onChange={this.props.handleChange}
              defaultValue={this.state.poster}
            />
            <Label htmlFor="description">description</Label>
            <Input
              className="mb-3"
              type="text"
              id="description"
              onChange={this.props.handleChange}
              defaultValue={this.state.description}
            />
            <Label htmlFor="language">language</Label>
            <Input
              className="mb-3"
              type="text"
              id="language"
              onChange={this.props.handleChange}
              defaultValue={this.state.language}
            />
            <Button color="primary">save movie</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default EditMovieForm;
