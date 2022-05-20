import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";

function Register(props) {
  const title = "Register";
  document.title = "DumbSound | " + title;
  const [show, setShow] = useState(props.isOpen);

  console.log(show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   const [state, dispatch] = useContext(UserContext); // useContext
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

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="bg-var-dark">
          <h2 className="mb-4">Register</h2>
          <div className="card-auth px-3">
            {message}
            <form>
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
                Already have an account ? Klik <span className="fw-bold">Here</span>{" "}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}
    </>
  );
}

export default Register;
