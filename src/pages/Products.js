import React from "react";
import { Button, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Tableproduct from "../components/Table/Tableproduct";

import "./Home/Styled.css"
const Products = () => {
  const navigate = useNavigate();
  const addProduct = () => {
    navigate("/add-product");
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Row responsive="xs">
          <Stack direction="horizontal">
            <div>
              <h2 className="mt-4 mb-4 headline col">Product</h2>
            </div>
            <div className="ms-auto mt-4 mb-4"><Button variant="dark" className="px-4 py-2" onClick={addProduct}>Add</Button></div>
          </Stack>
        </Row>
        <Row>
          <Tableproduct />
        </Row>
      </Container>
    </div>
  );
};

export default Products;
