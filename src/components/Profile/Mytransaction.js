import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Mytransaction = () => {
  return (
    <Col md="6">
    <div className="text-header-product mb-4">My Transaction</div>
    {transactions?.length != 0 ? (
      <>
        {transactions?.map((item) => (
          <div style={{ background: "#303030" }} className="p-2 mb-1">
            <Container fluid className="px-1">
              <Row>
                <Col xs="3">
                  <img
                    src={item.product.image}
                    alt="img"
                    className="img-fluid"
                    style={{
                      height: "120px",
                      width: "170px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col xs="6">
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#F74D4D",
                      fontWeight: "500",
                      lineHeight: "19px",
                    }}
                  >
                    {item.product.name}
                  </div>
                  <div
                    className="mt-2"
                    style={{
                      fontSize: "14px",
                      color: "#F74D4D",
                      fontWeight: "300",
                      lineHeight: "19px",
                    }}
                  >
                    {dateFormat(item.createdAt, "dddd, d mmmm yyyy")}
                  </div>

                  <div
                    className="mt-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "300",
                    }}
                  >
                    Price : {convertRupiah.convert(item.price)}
                  </div>

                  <div
                    className="mt-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Sub Total : {convertRupiah.convert(item.price)}
                  </div>
                </Col>
                <Col xs="3">
                  <img
                    src={imgDumbMerch}
                    alt="img"
                    className="img-fluid"
                    style={{ maxHeight: "120px" }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        ))}
      </>
    ) : (
      <div className="no-data-transaction">No transaction</div>
    )}
  </Col>
  )
}

export default Mytransaction
