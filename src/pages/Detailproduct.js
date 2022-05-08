import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { API } from "../config/api";

import "./Home/Styled.css";

const Detailproduct = () => {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/product/" + id);
      console.log(response.data.data.products);
      setProduct(response.data.data.products);
    };
    fetchData();
  }, []);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md="1"></Col>
          <Col md="5">
            <Card bg="danger">
              <Image className="img" height={500} src={product?.image} />
            </Card>
          </Col>
          <Col md="1"></Col>
          <Col md="4">
            <h1 className="headline">{product?.name}</h1>
            <p className="sub-headline">
              Stock : {product?.qty}
            </p>
            <p className="sub-headline mt-4">{product?.desc}</p>
            <h3 className="headline text-end mt-4">
              {formatter.format(product?.price)}
            </h3>
            <div className="d-grid gap-2 mt-5">
              <Button variant="danger"
                // onClick={(e) => handleBuy.mutate(e)}
                className="btn btn-buy"
              >
                Buy
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detailproduct;
