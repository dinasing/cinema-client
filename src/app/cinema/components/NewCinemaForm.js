import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCinema } from '../actions/cinemaAction';
import { clearErrors } from '../../common/actions/errorAction';
import { HallFormContainer } from './Hall';

class NewCinemaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      city: '',
      address: '',
      description: '',
      cinemaHalls: [{ title: '', schema: [{ numberOfSits: '', sitsType: '' }] }],
    };
  }

  handleCinemaHallTitleChange = stateIndex => e => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, index) =>
      stateIndex !== index ? cinemaHall : { ...cinemaHall, title: e.target.value }
    );

    this.setState({ cinemaHalls: newCinemaHalls });
  };

  handleNumberOfSitsChange = (stateCinemaHallIndex, stateRowIndex) => e => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, cinemaHallIndex) =>
      stateCinemaHallIndex !== cinemaHallIndex
        ? cinemaHall
        : {
            ...cinemaHall,
            schema: cinemaHall.schema.map((row, rowIndex) => {
              row = stateRowIndex !== rowIndex ? row : { ...row, numberOfSits: e.target.value };

              return row;
            }),
          }
    );
    this.setState({ cinemaHalls: newCinemaHalls });
  };

  handleSitsTypeChange = (stateCinemaHallIndex, stateRowIndex) => e => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, cinemaHallIndex) =>
      stateCinemaHallIndex !== cinemaHallIndex
        ? cinemaHall
        : {
            ...cinemaHall,
            schema: cinemaHall.schema.map((row, rowIndex) => {
              row = stateRowIndex !== rowIndex ? row : { ...row, numberOfSits: e.target.value };

              return row;
            }),
          }
    );
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
        { title: '', schema: [{ numberOfSits: '', sitsType: '' }] },
      ]),
    });
  };

  handleAddRow = stateCinemaHallIndex => () => {
    const newCinemaHalls = this.state.cinemaHalls.map((cinemaHall, cinemaHallIndex) =>
      stateCinemaHallIndex !== cinemaHallIndex
        ? cinemaHall
        : { ...cinemaHall, schema: cinemaHall.schema.concat([{ numberOfSits: '', sitsType: '' }]) }
    );
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

    const { title, city, address, description, cinemaHalls } = this.state;
    const newCinema = {
      title,
      city,
      address,
      description,
      cinemaHalls,
    };
    this.props.addCinema(newCinema);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'ADD_CINEMA_FAIL' ? error.message.message : null });
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
            <fieldset>
              <legend>cinema halls</legend>
              <Button className="mb-3" onClick={this.handleAddCinemaHall}>
                add cinema hall
              </Button>

              <HallFormContainer
                handleRemoveCinemaHall={this.handleRemoveCinemaHall}
                handleNumberOfSitsChange={this.handleNumberOfSitsChange}
                handleSitsTypeChange={this.handleSitsTypeChange}
                handleRemoveRow={this.handleRemoveRow}
                handleCinemaHallTitleChange={this.handleCinemaHallTitleChange}
                sitsTypes={this.props.sitsTypes}
                cinemaHalls={this.state.cinemaHalls}
                handleAddRow={this.handleAddRow}
              />
            </fieldset>
            <Button className="mb-3">add movie theater</Button>
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

export default connect(mapStateToProps, { addCinema, clearErrors })(NewCinemaForm);
