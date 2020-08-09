import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';
import { Options } from '../../common/components/Options';

class EditMovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      release_date: '',
      end_date: '',
      genre: [],
      description: '',
      poster: '',
      language: '',
    };
  }

  componentDidMount() {
    const {
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
    } = this.props.movieToEdit;
    this.setState({
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
    } = this.props.movieToEdit;
    if (this.isMovieChanged(prevProps.movieToEdit, this.props.movieToEdit)) {
      this.setState({
        title,
        release_date,
        end_date,
        genre,
        description,
        poster,
        language,
      });
    }
  }

  isMovieChanged(prevPropsMovie, movie) {
    const { title, release_date, end_date, genre, description, poster, language } = movie;
    return (
      title !== prevPropsMovie.title ||
      release_date !== prevPropsMovie.release_date ||
      end_date !== prevPropsMovie.end_date ||
      genre !== prevPropsMovie.genre ||
      description !== prevPropsMovie.description ||
      poster !== prevPropsMovie.poster ||
      language !== prevPropsMovie.language
    );
  }

  render() {
    const { title, release_date, end_date, genre, description, poster, language } = this.state;

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
              onChange={this.props.handleChange}
              defaultValue={title}
            />
            <Label htmlFor="release_date">from</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="release_date"
              onChange={this.props.handleChange}
              defaultValue={release_date}
            />

            <Label htmlFor="end_date">to</Label>
            <Input
              required
              className="mb-3"
              type="date"
              id="end_date"
              onChange={this.props.handleChange}
              defaultValue={end_date}
            />

            <Label htmlFor="genre">genre</Label>
            <Input
              required
              className="mb-3"
              type="select"
              id="genre"
              onChange={this.props.handleGenresChange}
              multiple
              value={genre}
            >
              <Options items={this.props.genres} field="name" />
            </Input>

            <Label htmlFor="poster">link to poster</Label>
            <Input
              className="mb-3"
              type="text"
              id="poster"
              onChange={this.props.handleChange}
              defaultValue={poster}
            />
            <Label htmlFor="description">description</Label>
            <Input
              className="mb-3"
              type="text"
              id="description"
              onChange={this.props.handleChange}
              defaultValue={description}
            />
            <Label htmlFor="language">language</Label>
            <Input
              className="mb-3"
              type="text"
              id="language"
              onChange={this.props.handleChange}
              defaultValue={language}
            />
            <Button color="primary">save movie</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default EditMovieForm;
