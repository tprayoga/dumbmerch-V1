import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Addcategory from '../components/Form/Addcategory';
import Navbar from "../components/Navbar/Navbar";

import "./Home/Styled.css"

const Addcategories = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <h2 className="mt-4 mb-4 headline">Add Category</h2>
          </Col>
        </Row>
        <Row>
            <Addcategory/>
        </Row>
      </Container>
    </div>
  )
}

export default Addcategories
