import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Navbar from "../components/Navbar";

const Pricing = () => {
  const title = "Pricing";
  document.title = "Dumbsound | " + title;
  return (
    <>
      <Navbar title={title} />

      <Container className=" vh-100 d-flex justify-content-center align-items-center">
        <Row>
          <Col md={12} className="text-center">
            <h2 className="fw-bold mb-4">Subscribe</h2>
            <p>
              Bayar Sekarang dan nikmati streaming music yang kekinian dari <span className="text-var-red fw-bold">DUMB</span>
              <span className="fw-bold">SOUND</span>
            </p>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <Card className="card-price bg-var-dark-gray text-center">
              <Card.Header as="h5">Subscribe</Card.Header>
              <Card.Body>
                <Card.Title>
                  <span className="fs-3 text-var-red">Rp.20.000</span>
                  <span className="">/Bulan</span>
                </Card.Title>
                <Card.Text>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>Music Kualitas Terbaik</li>
                    <li>Bebas Akses Music Selama 30 Hari</li>
                    <li>Dapatkan diskon berlangganan</li>
                    <li>Help center access</li>
                  </ul>
                </Card.Text>
                <button className="btn-red px-5"> Buy</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Pricing;
