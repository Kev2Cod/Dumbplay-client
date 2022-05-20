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

export default function NavbarAdmin({ title }) {
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
          {title === "Transactions" ? (
            <>
              <li className="mb-3">
                <Link to="/add-music">
                  <img src={AddMusic} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Add Music</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/add-artis">
                  <img src={AddArtis} alt="" width="20" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Add Artis</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/">
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Logout</span>
                </Link>
              </li>
            </>
          ) : title === "Add Music" ? (
            <>
              <li className="mb-3">
                <Link to="/transaction">
                  <img src={Pay} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Transactions</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/add-artis">
                  <img src={AddArtis} alt="" width="20" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Add Artis</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/">
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Logout</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="mb-3 border ">
                <Link to="/add-music">
                  <img src={AddMusic} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Add Music</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/transaction">
                  <img src={Pay} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Transactions</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/">
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Logout</span>
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
      <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
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
  );
}
