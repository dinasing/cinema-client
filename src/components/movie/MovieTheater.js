import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class MovieTheater extends Component {
  render() {
    return <div>Movie theaters</div>;
  }
}

export default connect()(MovieTheater);
