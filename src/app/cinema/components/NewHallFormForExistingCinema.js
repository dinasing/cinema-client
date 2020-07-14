import React, { Component } from 'react';
import { Input, Label, Row, Col, Button, Form } from 'reactstrap';
import { RowForm } from './NewHall';

export default class NewHallFormForExistingCinema extends Component {
  render() {
    const { schema, seatsTypes } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Row xs="2">
          <Col>
            <Label htmlFor={'hallTitle'}>hall title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id={'hallTitle'}
              onChange={this.props.handleTitleChange}
            />
          </Col>
          <Col>
            <p className="mb-2">rows of the cinema hall</p>
            <Button color="primary" className="mb-3" onClick={this.props.handleAddRow}>
              add row
            </Button>
            <div>
              {schema.map((row, rowIndex) => (
                <>
                  <RowForm
                    seatsTypes={seatsTypes}
                    id={rowIndex}
                    handleNumberOfSeatsChange={this.props.handleNumberOfSeatsChange(rowIndex)}
                    handleSeatsTypeChange={this.props.handleSeatsTypeChange(rowIndex)}
                    rowIndex={rowIndex}
                  />
                  <Button
                    color="danger"
                    className="mb-3"
                    onClick={this.props.handleRemoveRow(rowIndex)}
                  >
                    delete row
                  </Button>
                </>
              ))}
            </div>
          </Col>
        </Row>
        <Button color="primary" className="mb-3">
          save hall
        </Button>
      </Form>
    );
  }
}
