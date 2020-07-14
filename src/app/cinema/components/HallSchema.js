import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, UncontrolledTooltip } from 'reactstrap';

export default class HallSchema extends Component {
  render() {
    const { schema, hallTitle } = this.props;
    return <Seats schema={schema} hallTitle={hallTitle} />;
  }
}

const Seats = props => {
  const { schema, hallTitle } = props;

  const seats = schema.map((row, rowIndex) => {
    const rowSeats = new Array(Number(row.numberOfSeats)).fill().map((seat, seatIndex) => {
      seat = (
        <>
          <Badge
            color="primary"
            id={`hallTitle-${hallTitle}_row${rowIndex + 1}seat${seatIndex + 1}`}
          >
            {seatIndex + 1}
          </Badge>{' '}
          <UncontrolledTooltip
            placement="right"
            target={`hallTitle-${hallTitle}_row${rowIndex + 1}seat${seatIndex + 1}`}
          >
            {`row: ${rowIndex + 1},\nseat: ${seatIndex + 1},\ntype: ${row.seatsType}`}
          </UncontrolledTooltip>
        </>
      );
      return seat;
    });
    const newRow = (
      <h6 className="text-center">
        {`${rowIndex + 1} `}
        {rowSeats}
        {`${rowIndex + 1} `}
      </h6>
    );
    return newRow;
  });

  return <>{seats}</>;
};
