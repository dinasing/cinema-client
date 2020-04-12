import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

export class MovieTimes extends Component {
  componentDidMount() {}
  render() {
    return <div>Movie times</div>;
  }
}

export default connect()(MovieTimes);
