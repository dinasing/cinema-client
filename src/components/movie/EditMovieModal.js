import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editMovie } from '../../app/actions/movieAction';

import { Button, Modal, ModalHeader, ModalBody, Input, Label, FormGroup, Form } from 'reactstrap';

const EditMovieModal = props => {
  const { className, movie } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const id = movie.id;
  const [title, setTitle] = useState(movie.title);
  const [release_date, setReleaseDate] = useState(movie.release_date);
  const [end_date, setEndDate] = useState(movie.end_date);
  const [genre, setGenre] = useState(movie.genre);
  const [description, setDescription] = useState(movie.description);
  const [poster, setPoster] = useState(movie.poster);
  const [language, setLanguage] = useState(movie.language);

  const handleChangeTitle = e => setTitle(e.target.value);
  const handleChangeReleaseDate = e => setReleaseDate(e.target.value);
  const handleEndDate = e => setEndDate(e.target.value);
  const handleChangeGenre = e => setGenre(e.target.value);
  const handleChangeDescription = e => setDescription(e.target.value);
  const handleChangePoster = e => setPoster(e.target.value);
  const handleChangeLanguage = e => setLanguage(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const editedMovie = {
      id,
      title,
      release_date,
      end_date,
      genre,
      description,
      poster,
      language,
    };

    props.editMovie(editedMovie);
    toggle();
  };

  return (
    <div>
      <Button onClick={toggle}>edit</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>edit movie</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">title</Label>
              <Input
                className="mb-3"
                type="text"
                id="title"
                onChange={handleChangeTitle}
                placeholder=""
                defaultValue={movie.title}
              />
              <Label htmlFor="release_date">from</Label>
              <Input
                className="mb-3"
                type="date"
                id="release_date"
                onChange={handleChangeReleaseDate}
                placeholder="DD.MM.YYYY"
                defaultValue={movie.release_date}
              />

              <Label htmlFor="end_date">to</Label>
              <Input
                className="mb-3"
                type="date"
                id="end_date"
                onChange={handleEndDate}
                placeholder="DD.MM.YYYY"
                defaultValue={movie.end_date}
              />

              <Label htmlFor="genre">genre</Label>
              <Input
                className="mb-3"
                type="text"
                id="genre"
                onChange={handleChangeGenre}
                placeholder=""
                defaultValue={movie.genre}
              />

              <Label htmlFor="poster">link to poster</Label>
              <Input
                className="mb-3"
                type="text"
                id="poster"
                onChange={handleChangePoster}
                placeholder=""
                defaultValue={movie.poster}
              />
              <Label htmlFor="description">description</Label>
              <Input
                className="mb-3"
                type="text"
                id="description"
                onChange={handleChangeDescription}
                placeholder=""
                defaultValue={movie.description}
              />
              <Label htmlFor="language">language</Label>
              <Input
                className="mb-3"
                type="text"
                id="language"
                onChange={handleChangeLanguage}
                placeholder=""
                defaultValue={movie.language}
              />
              <Button color="primary">save</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

// export default EditMovieModal;
const mapStateToProps = state => ({
  movies: state.rootReducer.movie,
});
export default connect(mapStateToProps, { editMovie })(EditMovieModal);
