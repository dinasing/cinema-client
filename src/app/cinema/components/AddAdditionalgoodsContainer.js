import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAdditionalGoods } from '../actions/additionalGoodsAction';
import AdditionalGoodsForm from './AdditionalGoodsForm';

class AddCinemaHallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const cinemaId = this.props.match.params.id;
    const { title, description, image } = this.state;
    const goods = {
      title,
      description,
      image,
      cinemaId,
    };
    this.props.addAdditionalGoods(goods);
  };

  render() {
    const { title, description, image } = this.state;
    const newGoods = { title, description, image };

    return (
      <>
        <h3>add goods</h3>
        <AdditionalGoodsForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          goodsToEdit={newGoods}
        />
      </>
    );
  }
}

AddCinemaHallContainer.propTypes = {
  addAdditionalGoods: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.rootReducer.error,
});

export default connect(mapStateToProps, { addAdditionalGoods })(AddCinemaHallContainer);
