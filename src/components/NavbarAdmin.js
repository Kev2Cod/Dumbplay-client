import React, { useState, useContext } from "react";
import { Navbar, Nav, Container, Dropdown, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/icon/logo-shapes.svg";
import Avatar from "react-avatar";

import Pay from "../assets/icon/bill.svg";
import AddMusic from "../assets/icon/add-music.svg";
import AddArtis from "../assets/icon/add-artis.svg";
import Logout from "../assets/icon/logout.svg";

import { UserContext } from "../context/userContext";

export default function NavbarAdmin({ title, nameUser }) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const content = (
    <Popover variant="dark" id="dropdown" className="list-dropdown ">
      <Popover.Body className="bg-var-dark-gray">
        <ul class="list-unstyled">
          {title === "Transactions" ? (
            <>
              <li className="mb-3">
                <Link to="/list-music">
                  <img src={AddMusic} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">List Music</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/list-artis">
                  <img src={AddArtis} alt="" width="20" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">List Artis</span>
                </Link>
              </li>
              <li className="mb-3">
                <button className="btn-transparent" onClick={logout}>
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </button>
              </li>
            </>
          ) : title === "List Music" ? (
            <>
              <li className="mb-3">
                <Link to="/transactions">
                  <img src={Pay} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Transactions</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/List-artis">
                  <img src={AddArtis} alt="" width="20" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">List Artis</span>
                </Link>
              </li>
              <li className="mb-3">
                <button className="btn-transparent" onClick={logout}>
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mb-3 ">
                <Link to="/list-music">
                  <img src={AddMusic} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">List Music</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/transactions">
                  <img src={Pay} alt="" width="25" className="me-2" />
                  <span className="fw-bold text-decoration-none text-white">Transactions</span>
                </Link>
              </li>
              <li className="mb-3">
                <button className="btn-transparent" onClick={logout}>
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </button>
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
                <Avatar color="#3A3A3A" name={nameUser} size="40" round={true} />
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
