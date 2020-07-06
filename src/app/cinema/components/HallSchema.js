import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

export default class HallSchema extends Component {
  render() {
    const { schema } = this.props;
    return <Sits schema={schema} />;
  }
}

const Sits = props => {
  const { schema } = props;
  const sits = schema.map((row, rowIndex) => {
    const rowSits = new Array(Number(row.numberOfSits)).fill().map((sit, sitIndex) => {
      sit = (
        <>
          <Badge color="primary">{sitIndex + 1}</Badge>{' '}
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
