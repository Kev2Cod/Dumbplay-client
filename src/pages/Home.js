import React, { useState } from "react";
import Img from "../assets/image/Jumbotron.png";
import ImgMusic from "../assets/image/oleg-sergeichik-Ebhh_t6tjo0-unsplash.jpg";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import Logo from "../assets/icon/logo-shapes.svg";
import Navbar from "../components/Navbar";

export default function Home() {
  const title = "Home";
  document.title = "Dumbsound | " + title;
  const dataDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <Navbar title={title} />

      {/* Banner */}
      <div className="banner">
        <img src={Img} alt="" className="img-banner" />
        <div className="text-banner">
          <h1>Connect on DumbSound</h1>
          <p>
            Discovery, Stream, and share a constantly expanding mix of music <br /> from emerging and major artists around the world
          </p>
        </div>
      </div>

      {/* Cards Music */}
      <div className="container mb-5">
        <h4 className="text-center text-var-red mt-4 fw-bold mb-4">Dengarkan Dan Rasakan</h4>
        <div className="musics d-flex flex-wrap gap-2 justify-content-start mt-2">
          {/* Card */}
          {dataDummy.map((item) => (
            <Card as={Link} to="/" className="text-nolink card-music bg-var-dark-gray mb-2" style={{ textDecoration: "none", color: "white" }}>
              <img src={ImgMusic} class="card-image" alt="" />
              <div className="d-flex justify-content-between mt-2 ">
                <span className="fw-bold ">Logic</span>
                <span>2018</span>
              </div>
              <div className="d-flex justify-content-between mt-2 ">
                <span className="text-small">88rising</span>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
