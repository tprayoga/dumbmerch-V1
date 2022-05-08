import React from 'react'
import { Button, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import Tablecategori from '../components/Table/Tablecategori';

const Category = () => {
  let navigate = useNavigate()
  const addCategory = () => {
    navigate("/add-category")
  }
  return (
    <div>
      <Navbar />
      <Container>
        <Row responsive="xs">
          <Stack direction="horizontal">
            <div>
              <h2 className="mt-4 mb-4 headline col">Product</h2>
            </div>
            <div className="ms-auto mt-4 mb-4"><Button onClick={addCategory} variant="dark" className="px-4 py-2">Add</Button></div>
          </Stack>
        </Row>
        <Row>
          <Tablecategori />
        </Row>
      </Container>
    </div>
  )
}

export default Category
