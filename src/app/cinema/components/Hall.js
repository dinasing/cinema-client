import React, { Component } from 'react';
import { Input, Label, Row, Col } from 'reactstrap';
import { Options } from '../../common/components/Options';

export const HallFormContainer = props => {
  const newHallForms = [];
  for (let i = 0; i < props.numberOfHalls; i++) {
    newHallForms.push(
      <HallForm
        key={i}
        number={i}
        id={i}
        handleChange={props.handleChange}
        sitsTypes={props.sitsTypes}
      />
    );
  }
  return <div>{newHallForms}</div>;
};

class HallForm extends Component {
  state = { numberOfRows: '1', schema: [] };
  handleNumberOfRowsChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ numberOfRows: e.target.value });
  };
  render() {
    return (
      <Row xs="2">
        <Col>
          <Label htmlFor={'hallTitle' + this.props.id}>hall title</Label>
          <Input
            required
            className="mb-3"
            type="text"
            id={'hallTitle' + this.props.id}
            onChange={this.props.handleChange}
            placeholder=""
          />
        </Col>

        <Col>
          <Label htmlFor={'numberOfRows' + this.props.id}>number of rows</Label>
          <Input
            required
            className="mb-3"
            type="number"
            id={'numberOfRows' + this.props.id}
            onChange={this.handleNumberOfRowsChange}
            placeholder="1"
            min="1"
            max="30"
          />
          <RowFormContainer
            handleChange={this.props.handleChange}
            numberOfRows={this.state.numberOfRows}
            sitsTypes={this.props.sitsTypes}
          />
        </Col>
      </Row>
    );
  }
}
const RowFormContainer = props => {
  const newRowForms = [];
  for (let i = 0; i < props.numberOfRows; i++) {
    newRowForms.push(
      <RowForm
        key={i}
        number={i}
        id={i}
        handleChange={props.handleChange}
        sitsTypes={props.sitsTypes}
      />
    );
  }
  return <>{newRowForms}</>;
};

const RowForm = props => (
  <Row xs="2">
    <Col>
      <Label htmlFor={'numberOfSits' + props.id}>number of sits</Label>
      <Input
        required
        className="mb-3"
        type="number"
        id={'numberOfSits' + props.id}
        onChange={props.handleChange}
        min="1"
        max="101"
      />
    </Col>

    <Col>
      <Label htmlFor={'sitType' + props.id}>type of sits</Label>
      <Input
        required
        className="mb-3"
        type="select"
        id={'sitType' + props.id}
        onChange={props.handleChange}
        placeholder=""
      >
        <Options items={props.sitsTypes} />
      </Input>
    </Col>
  </Row>
);
