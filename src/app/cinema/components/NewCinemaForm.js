import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addCinema } from '../actions/cinemaAction';
import { clearErrors } from '../../common/actions/errorAction';
import { HallFormContainer } from './NewHall';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { withMenu } from '../../menu/withMenu';
import { getSeatTypes } from '../../seatType/actions/seatTypeAction';

class NewCinemaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      city: '',
      address: '',
      description: '',
      photo: '',
      cinemaHalls: [{ title: '', schema: [{ numberOfSeats: '', seatsType: '' }] }],
    };
  }
  componentDidMount() {
    this.props.getSeatTypes();
  }

  handleCinemaHallTitleChange = stateIndex => e => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, index) => {
      if (stateIndex !== index) return cinemaHall;
      return { ...cinemaHall, title: e.target.value };
    });

    this.setState({ cinemaHalls: newCinemaHalls });
  };

  handleNumberOfSeatsChange = (stateCinemaHallIndex, stateRowIndex) => e => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, cinemaHallIndex) => {
      if (stateCinemaHallIndex !== cinemaHallIndex) return cinemaHall;
      const newSchema = cinemaHall.schema.map((row, rowIndex) => {
        if (stateRowIndex !== rowIndex) return row;
        return { ...row, numberOfSeats: e.target.value };
      });
      return { ...cinemaHall, schema: newSchema };
    });
    this.setState({ cinemaHalls: newCinemaHalls });
  };

  handleSeatsTypeChange = (stateCinemaHallIndex, stateRowIndex) => e => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, cinemaHallIndex) => {
      if (stateCinemaHallIndex !== cinemaHallIndex) return cinemaHall;
      const newSchema = cinemaHall.schema.map((row, rowIndex) => {
        if (stateRowIndex !== rowIndex) return row;
        return { ...row, seatsType: e.target.value };
      });
      return { ...cinemaHall, schema: newSchema };
    });
    this.setState({ cinemaHalls: newCinemaHalls });
  };

  handleRemoveCinemaHall = stateIndex => () => {
    this.setState({
      cinemaHalls: this.state.cinemaHalls.filter((cinema, index) => index !== stateIndex),
    });
  };

  handleAddCinemaHall = () => {
    this.setState({
      cinemaHalls: this.state.cinemaHalls.concat([
        { title: '', schema: [{ numberOfSeats: '', seatsType: '' }] },
      ]),
    });
  };

  handleAddRow = stateCinemaHallIndex => () => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, cinemaHallIndex) => {
      if (stateCinemaHallIndex !== cinemaHallIndex) return cinemaHall;
      const newSchema = cinemaHall.schema.concat([{ numberOfSeats: '', seatsType: '' }]);
      return { ...cinemaHall, schema: newSchema };
    });
    this.setState({ cinemaHalls: newCinemaHalls });
  };

  handleRemoveRow = (stateCinemaHallIndex, stateRowIndex) => () => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, cinemaHallIndex) => {
      if (stateCinemaHallIndex !== cinemaHallIndex) return cinemaHall;
      const newSchema = cinemaHall.schema.filter((row, rowIndex) => stateRowIndex !== rowIndex);
      return { ...cinemaHall, schema: newSchema };
    });
    this.setState({ cinemaHalls: newCinemaHalls });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { title, city, address, description, cinemaHalls, photo } = this.state;
    const newCinema = {
      title,
      city,
      address,
      description,
      photo,
      cinemaHalls,
    };
    this.props.addCinema(newCinema);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'ADD_CINEMA_FAIL') {
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }
  }
  render() {
    return (
      <Container>
        {this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
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
              icon="user"
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
            <Label htmlFor="photo">photo</Label>
            <Input
              className="mb-3"
              type="text"
              id="photo"
              onChange={this.handleChange}
              placeholder=""
            />
            <fieldset>
              <legend>cinema halls</legend>
              <Button color="primary" className="mb-3" onClick={this.handleAddCinemaHall}>
                add cinema hall
              </Button>

              <HallFormContainer
                handleRemoveCinemaHall={this.handleRemoveCinemaHall}
                handleNumberOfSeatsChange={this.handleNumberOfSeatsChange}
                handleSeatsTypeChange={this.handleSeatsTypeChange}
                handleRemoveRow={this.handleRemoveRow}
                handleCinemaHallTitleChange={this.handleCinemaHallTitleChange}
                seatsTypes={this.props.seatsTypes}
                cinemaHalls={this.state.cinemaHalls}
                handleAddRow={this.handleAddRow}
              />
            </fieldset>
            <Button color="primary" className="mb-3">
              save movie theater
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  seatsTypes: state.rootReducer.seatType.seatsTypes,
});

export default connect(mapStateToProps, { addCinema, clearErrors, getSeatTypes })(
  withMenu(NewCinemaForm, CINEMAS_MENU_ITEMS)
);
