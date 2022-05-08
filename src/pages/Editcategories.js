import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Editcategory from '../components/Form/Editcategory';
import Navbar from "../components/Navbar/Navbar";

import "./Home/Styled.css"


const Editcategories = () => {
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
            <Editcategory/>
        </Row>
      </Container>
    </div>
  )
}

export default Editcategories
