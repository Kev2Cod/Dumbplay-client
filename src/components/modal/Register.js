import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";

import Login from "./Login";

import { API } from "../../config/api";

function Register(props) {
  const title = "Register";
  document.title = "DumbSound | " + title;
  const [show, setShow] = useState(props.isOpen);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isClickLogin, setIsClickLogin] = useState(false);
  const handleClickLogin = () => setIsClickLogin(!isClickLogin);

  const handleLogin = () => {
    setShow(false);
    handleClickLogin();
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    phone: "",
    address: "",
  });

  // dikeluarkan
  const { email, password, name, gender, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert data menjadi string, untuk dikirim ke database
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log(response);
      setShow(false);

      // set loading false
      setLoadingSubmit(false);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1 text-center">
          <span className="blink">Failed</span>
        </Alert>
      );

      setLoadingSubmit(false);
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="bg-var-dark">
          <h2 className="mb-4">Register</h2>
          <div className="card-auth px-3">
            {message}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div class="mb-3 form">
                <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email} required />
              </div>
              <div class="mb-3 form">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Full Name" name="name" onChange={handleChange} value={name} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Gender" name="gender" onChange={handleChange} value={gender} required />
              </div>
              <div class="mb-3 form">
                <input type="number" placeholder="Phone" name="phone" onChange={handleChange} value={phone} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Address" name="address" onChange={handleChange} value={address} required />
              </div>
              <div className="d-grid">
                {!loadingSubmit ? (
                  <>
                    <button className="btn-red">Register</button>
                  </>
                ) : (
                  <>
                    <button className="btn-red blink" disabled>
                      Wait...
                    </button>
                  </>
                )}
              </div>
            </form>
            <div className="d-flex justify-content-center mt-3">
              <p>
                Already have an account ? Klik
                <Link to="" onClick={handleLogin} style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
                  &nbsp;Here
                </Link>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {isClickLogin ? <Login isOpen={isClickLogin} /> : null}
    </>
  );
}

export default Register;
