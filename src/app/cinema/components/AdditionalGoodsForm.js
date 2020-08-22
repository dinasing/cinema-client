import React, { Component } from 'react';
import { Input, Label, FormGroup, Container, Button, Form } from 'reactstrap';

export default class AddAdditionalGoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    const { title, description, image } = this.props.goodsToEdit;
    this.setState({
      title,
      description,
      image,
    });
  }

  componentDidUpdate(prevProps) {
    const { title, description, image } = this.props.goodsToEdit;
    if (this.isMovieChanged(prevProps.goodsToEdit, this.props.goodsToEdit)) {
      this.setState({
        title,
        description,
        image,
      });
    }
  }

  isMovieChanged(prevPropsMovie, movie) {
    const { title, description, image } = movie;
    return (
      title !== prevPropsMovie.title ||
      description !== prevPropsMovie.description ||
      image !== prevPropsMovie.image
    );
  }

  render() {
    const { title, description, image } = this.state;

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
            <Label htmlFor="image">image</Label>
            <Input
              className="mb-3"
              type="text"
              id="image"
              onChange={this.props.handleChange}
              defaultValue={image}
            />
            <Label htmlFor="description">description</Label>
            <Input
              className="mb-3"
              type="text"
              id="description"
              onChange={this.props.handleChange}
              defaultValue={description}
            />
            <Button color="primary">save</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
