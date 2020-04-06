import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Movie extends Component {
  render() {
    return <div>Movies</div>;
  }
}

export default connect()(Movie);
