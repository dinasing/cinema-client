import React, { Component } from 'react';
import { Button, Container, Input, Label, FormGroup, Form } from 'reactstrap';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { Options } from '../../common/components/Options';

class NewMovieTimeForm extends Component {
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ message: error.id === 'ADD_MOVIE_TIME_FAIL' ? error.message.message : null });
    }
  }

  createCinemaHallOptions(cinemaHalls, cinemaId) {
    return cinemaHalls.filter(cinemaHall => cinemaHall.cinemaId == cinemaId);
  }

  render() {
    const {
      cinemaHalls,
      cinemaId,
      seatsTypes,
      cinemaHallId,
      additionalGoodsPrices,
      additionalGoods,
    } = this.props;
    const cinemaHallsOptions = this.createCinemaHallOptions(cinemaHalls, cinemaId);
    const seatsTypesOptions = cinemaHallId
      ? this.props.createSeatsTypesOptions(seatsTypes, cinemaHalls, cinemaHallId)
      : [];

    return (
      <Container>
        <Form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <h2>add new movie time for cinema</h2>
            <Label htmlFor="movieId">movie</Label>
            <Input
              required
              className="mb-3"
              type="select"
              id="movieId"
              onChange={this.props.handleChange}
              placeholder=""
            >
              <option value="" selected disabled>
                select movie
              </option>
              <Options items={this.props.movies} />
            </Input>
            <Label htmlFor="cinemaHallId">hall</Label>
            <Input
              required
              className="mb-3"
              type="select"
              id="cinemaHallId"
              onChange={this.props.handleCinemaHallIdChange}
            >
              <option value="" selected disabled>
                select hall
              </option>
              <Options items={cinemaHallsOptions} />
            </Input>
            <Label htmlFor="time">time</Label>
            <Input
              required
              className="mb-3"
              type="time"
              id="time"
              onChange={this.props.handleChange}
            />
            <Label htmlFor="dateRange">date</Label>
            <br />
            <DateRange
              id="dateRange"
              ranges={[this.props.dateRange]}
              onChange={this.props.handleDateRangeChange}
              moveRangeOnFirstSelection={false}
            />
            <br />
            {seatsTypesOptions.map(seatsType => {
              return (
                <div key={seatsType.id}>
                  <Label htmlFor={seatsType.id}>price ({seatsType.title})</Label>
                  <Input
                    className="mb-3"
                    type="number"
                    id={seatsType.id}
                    min="0"
                    defaultValue="0"
                    onChange={this.props.handleSeatsTypePriceChange(seatsType.id)}
                  />
                </div>
              );
            })}
            {additionalGoods.length ? (
              <fieldset>
                <legend>additional goods to purchase within movie ticket</legend>
                <Input
                  required
                  className="mb-3"
                  type="select"
                  id="goods"
                  onChange={this.props.handleChangeSelectedGoods}
                  multiple
                >
                  <option value="" selected>
                    not selected
                  </option>
                  <Options items={additionalGoods} />
                </Input>
                <AdditionalGoodsFormFields
                  additionalGoods={additionalGoods}
                  additionalGoodsPrices={additionalGoodsPrices}
                  handleGoodsPriceChange={this.props.handleGoodsPriceChange}
                />
              </fieldset>
            ) : null}

            <Button color="primary">save</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const AdditionalGoodsFormFields = props => {
  const { additionalGoods, additionalGoodsPrices } = props;
  return additionalGoodsPrices.length > 0
    ? additionalGoodsPrices.map(goodsPrice => (
        <div key={goodsPrice.additionalGoodsId}>
          <Label htmlFor={goods.additionalGoodsId}>
            price for{' '}
            {additionalGoods.find(goods => goods.id == goodsPrice.additionalGoodsId).title}
          </Label>

          <Input
            className="mb-3"
            type="number"
            id={goodsPrice.additionalGoodsId}
            min="0"
            defaultValue="0"
            onChange={props.handleGoodsPriceChange(goodsPrice.additionalGoodsId)}
          />
        </div>
      ))
    : null;
};

export default NewMovieTimeForm;
