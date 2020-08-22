import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { editAdditionalGoods } from '../actions/additionalGoodsAction';
import { clearErrors } from '../../common/actions/errorAction';
import AdditionalGoodsForm from './AdditionalGoodsForm';

class EditAdditionalGoodsContainer extends Component {
  state = {
    editedGoodsInfo: {},
    message: null,
    isChangesSaved: false,
    goodsToEdit: {},
  };

  handleChange = e => {
    this.setState({
      editedGoodsInfo: { ...this.state.editedGoodsInfo, [e.target.id]: e.target.value },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    clearErrors();
    const editedGoods = this.state.editedGoodsInfo;
    editedGoods.id = this.state.goodsToEdit.id;
    this.props.editAdditionalGoods(editedGoods);

    this.setState({
      editedGoodsInfo: {},
      isChangesSaved: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'EDIT_GOODS_FAIL') {
        this.setState({
          message: error.message || "Changes haven't been saved!",
          isChangesSaved: false,
        });
      } else {
        this.setState({ message: 'null', isChangesSaved: true });
      }
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({
      goodsToEdit: this.props.additionalGoods.additionalGoods.find(goods => goods.id == id),
    });
  }

  onDismissSuccessAlert = () => {
    this.setState({
      isChangesSaved: false,
    });
  };

  onDismissErrorAlert = () => {
    this.setState({
      message: false,
    });
  };

  render() {
    const { isChangesSaved, message, goodsToEdit } = this.state;

    return (
      <>
        <Alert isOpen={message} toggle={this.onDismissErrorAlert} color="danger">
          {this.state.message}
        </Alert>

        <Alert
          isOpen={isChangesSaved && !message}
          toggle={this.onDismissSuccessAlert}
          color="primary"
        >
          Changes saved successfully!
        </Alert>
        {goodsToEdit ? (
          <AdditionalGoodsForm
            goodsToEdit={goodsToEdit}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          `there is nothing to edit`
        )}
      </>
    );
  }
}

EditAdditionalGoodsContainer.propTypes = {
  additionalGoods: PropTypes.object,
};

const mapStateToProps = state => ({
  additionalGoods: state.rootReducer.additionalGoods,
  error: state.rootReducer.error,
});
export default connect(mapStateToProps, { editAdditionalGoods })(EditAdditionalGoodsContainer);
