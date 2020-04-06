import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class MovieTime extends Component {
  render() {
    return <div>Movie times</div>;
  }
}

export default connect()(MovieTime);
