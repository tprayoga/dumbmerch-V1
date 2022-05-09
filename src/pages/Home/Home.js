import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Data } from "../../components/Card/data";
import { Button, Col, Container, Row } from "react-bootstrap";
import Cards from "../../components/Card/Cards";

import "./Styled.css";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
import { API } from "../../config/api";

const Home = () => {
  const [state] = useContext(UserContext);
  const [listCard, setListCard] = useState(6);
  const loadMore = () => {
    setListCard(listCard + listCard);
  };

  console.log(loadMore);

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data.products.slice(0,listCard)
  });

  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <h2 className="mt-4 mb-4 headline">Product</h2>
          </Col>
        </Row>
        <Row>
          {products?.map((item, index) => (
            <Cards key={index} item={item} />
          ))}
          <Button
            onClick={() => loadMore()}
            variant="dark"
            className=" w-100"
          >
            Load More
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
