import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import { getAdditionalGoods, deleteAdditionalGoods } from '../actions/additionalGoodsAction';
import { AdditionalGoodsList } from './AdditionalGoodsList';

class AdditionalGoodsContainer extends Component {
  state = {
    isDeleteModalOpen: false,
    isDeleted: false,
    idToDelete: '',
  };

  componentDidMount() {
    this.props.getAdditionalGoods();
  }

  toggleDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: !this.state.isDeleteModalOpen,
    });
  };

  deleteGoodsHandle = () => {
    const { idToDelete } = this.state;

    this.props.deleteAdditionalGoods(idToDelete);
    this.setState({
      isDeleted: true,
      idToDelete: '',
      isDeleteModalOpen: false,
    });
  };

  clickDeleteHandle = id => () => {
    this.setState({
      idToDelete: id,
    });

    this.toggleDeleteModal();
  };

  render() {
    const { additionalGoods } = this.props.additionalGoods;
    const cinemaId = this.props.match.params.id;

    return (
      <>
        {' '}
        <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
          <ModalHeader>Are you sure you want to delete goods?</ModalHeader>
          <ModalFooter>
            {' '}
            <Button onClick={this.deleteGoodsHandle} color="danger">
              delete
            </Button>{' '}
            <Button onClick={this.toggleDeleteModal} color="primary">
              cancel
            </Button>
          </ModalFooter>
        </Modal>
        <h3>
          additional goods{' '}
          <small>
            <Link to={'/movie-theaters/' + cinemaId + '/add-additional-goods/'}>add goods</Link>
          </small>
        </h3>
        <AdditionalGoodsList
          additionalGoods={additionalGoods}
          clickDeleteHandle={this.clickDeleteHandle}
        />
      </>
    );
  }
}

AdditionalGoodsContainer.propTypes = {
  additionalGoods: PropTypes.object.isRequired,
  getAdditionalGoods: PropTypes.func.isRequired,
  deleteAdditionalGoods: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  additionalGoods: state.rootReducer.additionalGoods,
});

export default connect(mapStateToProps, { getAdditionalGoods, deleteAdditionalGoods })(
  AdditionalGoodsContainer
);
