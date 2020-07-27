import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MovieTimes extends Component {
  render() {
    return <div>Movie times</div>;
  }
}

export default connect()(MovieTimes);
