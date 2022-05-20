import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/icon/logo-shapes.svg";
import Avatar from "react-avatar";

import Pay from "../assets/icon/bill.svg";
import AddMusic from "../assets/icon/add-music.svg";
import AddArtis from "../assets/icon/add-artis.svg";
import Logout from "../assets/icon/logout.svg";

import Login from "./modal/Login";
import Register from "./modal/Register";

export default function NavbarWeb({ title }) {
  const [isClickLogin, setIsClickLogin] = useState(false);
  const [isClickRegister, setIsClickRegister] = useState(false);

  const handleClickLogin = () => setIsClickLogin(!isClickLogin);
  const handleClickRegister = () => setIsClickRegister(!isClickRegister);

  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // dropdown profile
  const content = (
    <Popover variant="dark" id="dropdown" className="list-dropdown ">
      <Popover.Body className="bg-var-dark-gray">
        <ul class="list-unstyled">
          {title === "Error" ? (
            <>
              <li className="mb-3">
                <Link to="/">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Home</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/pay">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Pay</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={Logout} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </Link>
              </li>
            </>
          ) : title !== "Pricing" ? (
            <>
              <li className="mb-3">
                <Link to="/transactions">
                  <span className="fw-bold ">transaction</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/pay">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Pay</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={Logout} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="mb-3">
                <Link to="/">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={Logout} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {!isLogin ? (
        <>
          <Navbar fixed="top" variant="dark" expand="sm">
            <Container>
              <Navbar.Brand href="/">
                <img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top me-3" />
                <span className="text-var-red">DUMB</span>
                <span>SOUND</span>
              </Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <button className="btn-login me-3" onClick={handleClickLogin}>
                    Login
                  </button>
                  <button className="btn-register" onClick={handleClickRegister}>
                    Register
                  </button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* Modal */}
          {isClickLogin ? <Login isOpen={isClickLogin} /> : null}
          {isClickRegister ? <Register isOpen={isClickRegister} /> : null}
        </>
      ) : (
        <>
          <Navbar fixed="top" variant="dark" expand="sm">
            <Container>
              <Navbar.Brand href="/">
                <img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top me-3" />
                <span className="text-var-red">DUMB</span>
                <span>SOUND</span>
              </Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <OverlayTrigger trigger="click" placement="bottom" overlay={content}>
                    <Avatar color="#3A3A3A" name="Kevin Williams" size="40" round={true} />
                  </OverlayTrigger>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
}
