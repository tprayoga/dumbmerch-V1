import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar from '../components/Navbar/Navbar'
import Merch from "../components/assets/Frame.png"
import Icon from "../components/assets/Frame (1).png"
import { UserContext } from '../context/userContext'
import { API } from '../config/api'
import "./Home/Styled.css";



const Transactions = () => {
  const [transactions, setTransaction] = useState([]);

  const [state] = useContext(UserContext);

  const getTransactios = async () => {
    const response = await API.get("/transaction");
    setTransaction(response.data.data);
  };

  console.log(transactions);

  useEffect(() => {
    getTransactios();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Container className="mt-2">
          <Row className="text-sm-center text-lg-start">
            <Col className="col-sm-12 col-md-12 col-lg-4">
            <h2 className="mt-4 mb-4 headline col">Profile</h2>
              <img src={Merch} alt="Profile" />
            </Col>
            <Col className="col-sm-12 col-md-12 col-lg-3 mt-5">
              <div className="mb-3">
                <span className="headline fw-bold">Name</span>
                <p className='sub-headline'>{state.user.name}</p>
              </div>
              <div className="mb-3">
                <span className="headline fw-bold">Email</span>
                <p className='sub-headline'>{state.user.email}</p>
              </div>
              <div className="mb-3">
                <span className="headline fw-bold">Phone</span>
                <p className='sub-headline'>+628237437847</p>
              </div>
              <div className="mb-3">
                <span className="headline fw-bold">Gender</span>
                <p className='sub-headline'>Male</p>
              </div>
              <div className="mb-3">
                <span className="headline fw-bold">Address</span>
                <p className='sub-headline'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
              </div>
            </Col>

            <Col className="col-sm-12 col-md-12 col-lg-5 mb-sm-5 mb-lg-0">
            <h3 className="mt-4 mb-4 headline col">My Transaction</h3>
              {transactions?.length > 0 ? (
                <>
                  <table className="bg-dark d-flex rounded">
                    <tbody className="container-fluid">
                      {transactions?.map((item, index) => (
                        <tr className="d-flex justify-content-between align-items-center pt-2 pb-2 mb-1">
                          <td className="d-flex ">
                            <img width={100} height={100} src={item.product.image} className="img pe-3"  />
                            <div>
                              <span className="fw-bold text-danger ">{item.product.name}</span>
                              <small className="text-danger d-block mb-3">{item.createdAt} WIB</small>
                              <span className="text-white me-1 d-inline-block">Price: {item.product.price}</span>
                              <span className="text-white d-inline-block"> Status: {item.status}</span>
                            </div>
                          </td>
                          <td className="pe-3">
                            <img src={Icon} className="img"/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <div className="text-center sub-headline">No Transactions</div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Transactions
