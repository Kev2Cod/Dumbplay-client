import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";

const Contact = ({ dataContact, clickContact, contact }) => {
  // console.log("Data Contact :", dataContact);
  // console.log("Click Contact :", clickContact);
  return (
    <>
      {dataContact.length !== 0 && (
        <>
          <div className="d-grid">
            {dataContact?.map((item) => (
              <button key={item.id} className="btn-dark btn-contact d-flex align-items-center py-2 mb-2" onClick={() => clickContact(item)}>
                <Avatar color="#3A3A3A" name="test" size="25" round={true} />
                <div className="ms-3 text-start">
                  <span className="d-block text-light fw-bold">{item.name}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Contact;
