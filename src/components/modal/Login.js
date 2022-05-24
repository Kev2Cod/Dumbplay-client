import React, { useState, useContext } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import Register from "./Register";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function Login(props) {
  const [show, setShow] = useState(props.isOpen);

  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  // Control open register
  const [isClickRegister, setIsClickRegister] = useState(false);
  const handleClickRegister = () => setIsClickRegister(!isClickRegister);

  const title = "Login";
  document.title = "Dumbmers | " + title;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegister = () => {
    setShow(false);
    handleClickRegister();
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // dikeluarkan
  const { email, password } = form;

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
      const response = await API.post("/login", body, config);
      console.log(response);

      navigate("/");
      setShow(false);

      // set loading false
      setLoadingSubmit(false);

      // Checking Process
      if (response?.status === 200) {
        // Send data to useContext
        console.log("DI LOGIN : ", response);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data, // data disimpan ke state global
        });
      }

      if (response.data.data.status === "admin") {
        navigate("/transactions");
      } else {
        navigate("/");
      }
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
      <Modal show={show} onHide={handleClose} className="rounded">
        <Modal.Body className="bg-var-dark">
          <h2 className="mb-3 text-white">Login</h2>
          <div className="card-auth px-4">
            {message}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div class="mb-3 form">
                <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email} required />
              </div>
              <div class="mb-3 form">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} required />
              </div>
              <div className="d-grid">
                {!loadingSubmit ? (
                  <>
                    <button className="btn-red">Login</button>
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
                You don't have account ? Klik
                <Link to="" onClick={handleRegister} style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
                  &nbsp;Here
                </Link>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}
      {isClickRegister ? <Register isOpen={isClickRegister} /> : null}
    </>
  );
}

export default Login;
