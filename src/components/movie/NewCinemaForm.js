/* eslint-disable */
import React, { Component } from 'react';
import { addCinema } from '../../app/actions/cinemaAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../app/actions/errorAction';
import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';

class NewMovieForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    title: '',
    city: '',
    address: '',
    description: '',
    numberOfHalls: '1',
    cinemaHalls: [],
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleNumberOfHallsChange = e => {
    this.setState({
      numberOfHalls: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { title, city, address, description } = this.state;
    const newCinema = {
      title,
      city,
      address,
      description,
    };
    this.props.addCinema(newCinema);
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'ADD_CINEMA_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <Container>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h2>add new movie theater</h2>
            <Label htmlFor="title">title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="title"
              onChange={this.handleChange}
              placeholder=""
            />
            <Label htmlFor="city">city</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id="city"
              onChange={this.handleChange}
              placeholder=""
            />
            <Label htmlFor="address">address</Label>
            <Input
              className="mb-3"
              type="text"
              id="address"
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

            <Label htmlFor="number">number of halls</Label>
            <Input
              className="mb-3"
              type="number"
              id="number"
              onChange={this.handleNumberOfHallsChange}
              defaultValue="1"
            />
            <Button>add</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
});

export default connect(mapStateToProps, { addCinema, clearErrors })(NewMovieForm);
