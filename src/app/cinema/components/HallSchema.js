import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, UncontrolledTooltip } from 'reactstrap';

export default class HallSchema extends Component {
  render() {
    const { schema, hallTitle } = this.props;
    return <Sits schema={schema} hallTitle={hallTitle} />;
  }
}

const Sits = props => {
  const { schema, hallTitle } = props;

  const sits = schema.map((row, rowIndex) => {
    const rowSits = new Array(Number(row.numberOfSits)).fill().map((sit, sitIndex) => {
      sit = (
        <>
          <Badge color="primary" id={`hallTitle-${hallTitle}_row${rowIndex + 1}sit${sitIndex + 1}`}>
            {sitIndex + 1}
          </Badge>{' '}
          <UncontrolledTooltip
            placement="right"
            target={`hallTitle-${hallTitle}_row${rowIndex + 1}sit${sitIndex + 1}`}
          >
            {`row: ${rowIndex + 1},\nsit: ${sitIndex + 1},\ntype: ${row.sitsType}`}
          </UncontrolledTooltip>
        </>
      );
      return sit;
    });
    const newRow = (
      <h6 className="text-center">
        {`${rowIndex + 1} `}
        {rowSits}
        {`${rowIndex + 1} `}
      </h6>
    );
    return newRow;
  });

  return <>{sits}</>;
};
