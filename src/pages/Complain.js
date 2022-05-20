import React, { useState } from "react";
import "../styles/complain.css";
import { Container, Row, Col } from "react-bootstrap";

import IconChat from "../assets/icon/chat.svg";
import Chat from "../components/complain/Chat";
import Contact from "../components/complain/Contact";

const Complain = () => {
  const [show, setShow] = useState(false);

  function handleClickChat() {
    console.log("SHOW");
    setShow(!show);
  }

  return (
    <>
      <button class="open-button" onClick={handleClickChat}>
        <img src={IconChat} alt="" />
      </button>
      <div class="chat-popup" style={{ display: show ? "block" : "none" }} id="myForm">
        <div class="form-container">
          {/* Chat */}

          <Container fluid>
            <Row>
              <Col md={12} className="mb-2">
                <div className="d-flex justify-content-between align-items-center ">
                  <label for="msg" className="fs-5">
                    <span>
                      <b>Complain</b>
                    </span>
                  </label>
                  <button type="button" class="btn cancel " onClick={handleClickChat}>
                    x
                  </button>
                </div>
              </Col>
              <Col md={4} className="complain-height border-end overflow-auto">
                <Contact />
              </Col>

              <Col md={8} className="complain-height ">
                <Chat />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Complain;
