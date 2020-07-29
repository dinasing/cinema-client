import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HallSchemaContainer extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
  error: state.rootReducer.error,
  sitsTypes: state.rootReducer.sitType.sitsTypes,
});

export default connect(mapStateToProps, { clearErrors, getSitTypes })(
  withMenu(HallSchemaContainer, CINEMAS_MENU_ITEMS)
);
