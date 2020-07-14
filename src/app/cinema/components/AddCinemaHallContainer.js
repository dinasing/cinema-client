import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withMenu } from '../../menu/withMenu';
import { addCinemaHall } from '../actions/cinemaHallAction';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { getSitTypes } from '../../sitType/actions/sitTypeAction';
import NewHallFormForExistingCinema from './NewHallFormForExistingCinema';

class AddCinemaHallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      schema: [{ numberOfSits: '', sitsType: '' }],
    };
  }

  componentDidMount() {
    this.props.getSitTypes();
  }

  handleTitleChange = e => {
    this.setState({
      title: e.target.value,
    });
  };

  handleAddRow = () => {
    const { schema } = this.state;
    this.setState({
      schema: schema.concat([{ numberOfSits: '', sitsType: '' }]),
    });
  };

  handleRemoveRow = stateIndex => () => {
    const { schema } = this.state;
    this.setState({
      schema: schema.filter((s, index) => index !== stateIndex),
    });
  };

  handleNumberOfSitsChange = stateRowIndex => e => {
    const { schema } = this.state;
    const newSchema = schema.map((row, rowIndex) => {
      if (stateRowIndex !== rowIndex) return row;
      return { ...row, numberOfSits: e.target.value };
    });
    this.setState({
      schema: newSchema,
    });
  };

  handleSitsTypeChange = stateRowIndex => e => {
    const { schema } = this.state;
    const newSchema = schema.map((row, rowIndex) => {
      if (stateRowIndex !== rowIndex) return row;
      return { ...row, sitsType: e.target.value };
    });
    this.setState({
      schema: newSchema,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const cinemaId = this.props.match.params.id;
    const { title, schema } = this.state;
    const newHall = {
      title,
      schema,
      cinemaId,
    };
    this.props.addCinemaHall(newHall);
  };

  render() {
    const { schema } = this.state;
    const { sitsTypes } = this.props;
    return (
      <>
        <h3>add hall</h3>
        <NewHallFormForExistingCinema
          sitsTypes={sitsTypes}
          schema={schema}
          handleAddRow={this.handleAddRow}
          handleTitleChange={this.handleTitleChange}
          handleRemoveRow={this.handleRemoveRow}
          handleNumberOfSitsChange={this.handleNumberOfSitsChange}
          handleSitsTypeChange={this.handleSitsTypeChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

AddCinemaHallContainer.propTypes = {
  addCinamaHall: PropTypes.func.isRequired,
  getSitTypes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.rootReducer.error,
  sitsTypes: state.rootReducer.sitType.sitsTypes,
});
export default connect(mapStateToProps, { addCinemaHall, getSitTypes })(
  withMenu(AddCinemaHallContainer, CINEMAS_MENU_ITEMS)
);
