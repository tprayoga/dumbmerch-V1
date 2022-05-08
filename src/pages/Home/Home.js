import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Data } from '../../components/Card/data'
import { Col, Container, Row } from 'react-bootstrap'
import Cards from '../../components/Card/Cards'

import "./Styled.css"
import { UserContext } from '../../context/userContext'
import { useQuery } from 'react-query'
import { API } from '../../config/api'

const Home = () => {
  const [state] = useContext(UserContext);

  console.log(state);

  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data.products
  });
  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col>
          <h2 className='mt-4 mb-4 headline'>Product</h2>
          </Col>
          </Row>
          <Row lg={5}>
            {products?.map((item,index)=>(
               <Cards key={index} item = {item}/>
            ))}
          </Row>
      </Container>
    </div>
  )
}

export default Home
