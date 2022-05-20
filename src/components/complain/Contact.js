import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";

const Contact = () => {
  const loopData = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="d-grid">
        <button className="btn-dark btn-contact d-flex align-items-center py-2 mb-2">
          <Avatar color="#3A3A3A" name="Kevin Williams" size="25" round={true} className="" />
          <div className="ms-3 text-start">
            <span className="d-block text-light fw-bold">Kevin</span>
          </div>
        </button>
        <button className="btn-dark btn-contact d-flex align-items-center py-2 mb-2">
          <Avatar color="#3A3A3A" name="Kevin Williams" size="25" round={true} className="" />
          <div className="ms-3 text-start">
            <span className="d-block text-light fw-bold">Kevin</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Contact;
