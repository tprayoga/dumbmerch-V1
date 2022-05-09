import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Merch from "../../components/assets/Frame.png";
import Loginform from "../../components/Form/Login";
import "../Home/Styled.css";

const Login = () => {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="8">
            <img
              src={Merch}
              className="img-fluid"
              style={{ width: "264px", height: "264px" }}
              alt="brand"
            />
            <div className="main mt-4">Easy, Fast and Reliable</div>
            <p className="sub mt-3">
              Go shopping for merchandise, just go to dumb merch <br />{" "}
              shopping. the biggest merchandise in <b>Indonesia</b>
            </p>
            <div className="mt-5">
              <Link to="/">
                <Button variant="danger px-5">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="dark ms-1 px-5">Register</Button>
              </Link>
            </div>
          </Col>
          <Col md="4">
            <Loginform />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
