import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardFooter, Button, Row } from 'reactstrap';

const GoodsCard = props => {
  const { image, title, description } = props.goods;
  return (
    <Card>
      <CardImg
        src={
          image || 'https://i.pinimg.com/originals/8a/eb/d8/8aebd875fbddd22bf3971c3a7159bdc7.png'
        }
      />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
      <CardFooter>
        <Button color="primary">edit</Button> <Button color="warning">delete</Button>
      </CardFooter>
    </Card>
  );
};

export const AdditionalGoodsList = props => {
  const { additionalGoods } = props;

  return (
    <Row xs="5">
      {additionalGoods.map(goods => (
        <GoodsCard goods={goods} />
      ))}
    </Row>
  );
};
