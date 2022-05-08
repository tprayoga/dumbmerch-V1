import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Editproduct from "../components/Form/Editproduct";
import Navbar from "../components/Navbar/Navbar";

import "./Home/Styled.css";

const Editproducts = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <h2 className="mt-4 mb-4 headline">Add Product</h2>
          </Col>
        </Row>
        <Row>
          <Editproduct />
        </Row>
      </Container>
    </div>
  );
};

export default Editproducts;
