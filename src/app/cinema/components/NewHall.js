import React from 'react';
import { Input, Label, Row, Col, Button } from 'reactstrap';
import { Options } from '../../common/components/Options';

export const HallFormContainer = props => {
  return (
    <>
      {props.cinemaHalls.map((cinemaHall, i) => (
        <Row xs="2">
          <Col>
            <Label htmlFor={'hallTitle' + i}>hall title</Label>
            <Input
              required
              className="mb-3"
              type="text"
              id={'hallTitle' + i}
              onChange={props.handleCinemaHallTitleChange(i)}
              value={cinemaHall.title}
            />
            <Button color="danger" className="mb-3" onClick={props.handleRemoveCinemaHall(i)}>
              delete hall
            </Button>
          </Col>

          <Col>
            <div className="mb-2">rows of the cinema hall</div>
            <Button color="primary" className="mb-3" onClick={props.handleAddRow(i)}>
              add row
            </Button>
            {cinemaHall.schema.map((row, rowIndex) => (
              <>
                <RowForm
                  key={i}
                  number={i}
                  id={i}
                  handleChange={props.handleChange}
                  seatsTypes={props.seatsTypes}
                  handleNumberOfSeatsChange={props.handleNumberOfSeatsChange(i, rowIndex)}
                  handleSeatsTypeChange={props.handleSeatsTypeChange(i, rowIndex)}
                  rowIndex={rowIndex}
                  cinemaHallIndex={i}
                />

                <Button
                  color="danger"
                  className="mb-3"
                  onClick={props.handleRemoveRow(i, rowIndex)}
                >
                  delete row
                </Button>
              </>
            ))}
          </Col>
        </Row>
      ))}
    </>
  );
};

export const RowForm = props => (
  <Row xs="2">
    <Col>
      <Label htmlFor={'numberOfSeats' + props.id}>number of seats</Label>
      <Input
        required
        className="mb-3"
        type="number"
        id={'numberOfSeats' + props.id}
        onChange={props.handleNumberOfSeatsChange}
        min="1"
        max="101"
      />
    </Col>

    <Col>
      <Label htmlFor={'seatType' + props.id}>type of seats</Label>
      <Input
        required
        className="mb-3"
        type="select"
        id={'seatType' + props.id}
        onChange={props.handleSeatsTypeChange}
      >
        <option value="" selected disabled>
          select type
        </option>
        <Options items={props.seatsTypes} />
      </Input>
    </Col>
  </Row>
);
