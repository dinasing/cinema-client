import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAdditionalGoods } from '../actions/additionalGoodsAction';
import { AdditionalGoodsList } from './AdditionalGoodsList';

class AdditionalGoodsContainer extends Component {
  componentDidMount() {
    this.props.getAdditionalGoods();
  }

  render() {
    const { additionalGoods } = this.props.additionalGoods;
    const cinemaId = this.props.match.params.id;

    return (
      <>
        <h3>
          additional goods{' '}
          <small>
            <Link to={'/movie-theaters/' + cinemaId + '/add-additional-goods/'}>add goods</Link>
          </small>
        </h3>
        <AdditionalGoodsList additionalGoods={additionalGoods} />
      </>
    );
  }
}

AdditionalGoodsContainer.propTypes = {
  additionalGoods: PropTypes.object.isRequired,
  getAdditionalGoods: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  additionalGoods: state.rootReducer.additionalGoods,
});
export default connect(mapStateToProps, { getAdditionalGoods })(AdditionalGoodsContainer);
