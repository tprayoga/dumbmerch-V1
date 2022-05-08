import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Addproduct from "../components/Form/Addproduct";
import Navbar from "../components/Navbar/Navbar";

import "./Home/Styled.css"
const Addproducts = () => {
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
            <Addproduct/>
        </Row>
      </Container>
    </div>
  );
};

export default Addproducts;
