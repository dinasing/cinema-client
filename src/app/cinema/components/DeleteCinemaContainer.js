import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withMenu } from '../../menu/withMenu';
import { CINEMAS_MENU_ITEMS } from '../../menu/menuItemsConstants';
import { deleteCinema, getCinemas } from '../actions/cinemaAction';
import DeleteCinema from './DeleteCinema';

class DeleteCinemaContainer extends Component {
  static propTypes = {
    cinemas: PropTypes.object,
    getCinemas: PropTypes.func.isRequired,
    deleteCinema: PropTypes.func.isRequired,
  };

  handleDelete = id => {
    this.props.deleteCinema(id);
  };
  componentDidMount() {
    this.props.getCinemas();
  }
  render() {
    const { cinemas } = this.props;
    return (
      <>
        <h2>delete movie theater</h2>
        <DeleteCinema deleteCinema={this.handleDelete} cinemas={cinemas} />
      </>
    );
  }
}
const mapStateToProps = state => ({
  cinemas: state.rootReducer.cinema,
  error: state.rootReducer.error,
});
export default connect(mapStateToProps, { deleteCinema, getCinemas })(
  withMenu(DeleteCinemaContainer, CINEMAS_MENU_ITEMS)
);
