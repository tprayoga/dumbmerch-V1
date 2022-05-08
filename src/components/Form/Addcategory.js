import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

const Addcategory = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify({ name: category });

      // Insert category data
      const response = await API.post('/category', body, config);

      navigate('/category');
    } catch (error) {
      console.log(error);
    }
  })
  return (
    <Col>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <input
          className="input mt-4"
          type="text"
          name="category"
          placeholder="Category Name"
          onChange={handleChange} 
          value={category}
        ></input>
        <div className="d-grid gap-2 mt-4">
          <Button type="submit" variant="success" size="md">
            Add
          </Button>
        </div>
      </form>
    </Col>
  );
};

export default Addcategory;
