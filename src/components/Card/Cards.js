import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  return (
    <Col>
      <Link to={`/detail-product/${item.id}`} className="product text-decoration-none ">
        <Card bg="dark" className="mb-4">
          <Card.Img
            className="img"
            height={300}
            variant="top"
            src={item.image}
          />
          <Card.Body>
            <Card.Title className="headline">{item.name}</Card.Title>
            <Card.Text className="m-0 sub-headline">
              {`${formatter.format(item.price)}`}
            </Card.Text>
            <Card.Text className="sub-headline">Stock : {item.qty}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default Cards;
