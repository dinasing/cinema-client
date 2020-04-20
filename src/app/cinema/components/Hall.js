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
            <Button className="mb-3" onClick={props.handleRemoveCinemaHall(i)}>
              delete hall
            </Button>
          </Col>

          <Col>
            <div className="mb-2">rows of the cinema hall</div>
            <Button className="mb-3" onClick={props.handleAddRow(i)}>
              add row
            </Button>
            {cinemaHall.schema.map((row, rowIndex) => (
              <>
                <RowForm
                  key={i}
                  number={i}
                  id={i}
                  handleChange={props.handleChange}
                  sitsTypes={props.sitsTypes}
                  handleNumberOfSitsChange={props.handleNumberOfSitsChange(i, rowIndex)}
                  handleSitsTypeChange={props.handleSitsTypeChange(i, rowIndex)}
                  rowIndex={rowIndex}
                  cinemaHallIndex={i}
                />

                <Button className="mb-3" onClick={props.handleRemoveRow(i, rowIndex)}>
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

const RowForm = props => (
  <Row xs="2">
    <Col>
      <Label htmlFor={'numberOfSits' + props.id}>number of sits</Label>
      <Input
        required
        className="mb-3"
        type="number"
        id={'numberOfSits' + props.id}
        onChange={props.handleNumberOfSitsChange}
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
        onChange={props.handleSitsTypeChange}
      >
        <option value="" selected disabled>
          select type
        </option>
        <Options items={props.sitsTypes} />
      </Input>
    </Col>
  </Row>
);
