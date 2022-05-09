import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { API } from "../config/api";

import "./Home/Styled.css";

const Detailproduct = () => {
  const params = useParams();
  const { id } = params;

  let navigate = useNavigate ()

  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/product/" + id);
      console.log(response.data.data.products);
      setProduct(response.data.data.products);
    };
    fetchData();
  }, []);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

   // Create config Snap payment with useEffect, untuk menampilkan modal pembayaran
   useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-tSYDKI7sBrsbnWM8";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async () => {
    try {
      // Get data from product
      const data = {
        idProduct: product.id,
        idSeller: product.seller.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      // Insert transaction data
      const response = await API.post("/transaction", body, config);
      console.log("Response Transaction: ", response.data.payment.token);

      // Create variabel for store token payment from response
      const token = response.data.payment.token;

      // Modify handle buy to display Snap payment page
      // //? dokumentasi midtrans
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md="1"></Col>
          <Col md="5">
            <Card bg="danger">
              <Image className="img" height={500} src={product?.image} />
            </Card>
          </Col>
          <Col md="1"></Col>
          <Col md="4">
            <h1 className="headline">{product?.name}</h1>
            <p className="sub-headline">
              Stock : {product?.qty}
            </p>
            <p className="sub-headline mt-4">{product?.desc}</p>
            <h3 className="headline text-end mt-4">
              {formatter.format(product?.price)}
            </h3>
            <div className="d-grid gap-2 mt-5">
              <Button variant="danger"
                // onClick={(e) => handleBuy.mutate(e)}
                className="btn btn-buy"
                onClick={handleBuy}
              >
                Buy
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detailproduct;
