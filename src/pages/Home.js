import React, { useState, useContext, useEffect } from "react";
import Img from "../assets/image/Jumbotron.png";
import { Card, Navbar as NavbarMusic } from "react-bootstrap";
import { Link, useInRouterContext } from "react-router-dom";
import "../styles/home.css";
import { useQuery } from "react-query";

import Navbar from "../components/Navbar";
import PlayerMusic from "../components/PlayerMusic";

import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import Logo from "../assets/icon/logo-shapes.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  // Untuk Navbar Admin
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState({});
  console.log("User", state);

  const loadUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      setUser(response.data.user.name);
    } catch (error) {}
  };

  useEffect(() => {
    loadUser();
  }, [user]);

  // ===========================================================

  const title = "Home";
  document.title = "Dumbsound | " + title;

  const [musics, setMusics] = useState([]);
  const [musicId, setMusicId] = useState("");
  console.log(musicId);

  // Fetch Music
  const fetchMusics = async () => {
    const response = await API.get("/musics");
    console.log(response.data.data.musics);
    setMusics(response.data.data.musics);
  };

  useEffect(() => {
    fetchMusics();
  }, [user]);

  return (
    <>
      <Navbar title={title} nameUser={user} />

      {/* Banner */}
      <div className="banner">
        <img src={Img} alt="" className="img-banner" />
        <div className="text-banner">
          <h1 className="text-white">Connect on DumbSound</h1>
          <p>
            Discovery, Stream, and share a constantly expanding mix of music <br /> from emerging and major artists around the world
          </p>
        </div>
      </div>

      {/* Cards Music */}
      <div className="container" style={{ marginBottom: "100px" }}>
        <h4 className="text-center text-var-red mt-4 fw-bold mb-4">Dengarkan Dan Rasakan</h4>
        <div className="musics d-flex flex-wrap gap-2 justify-content-around mt-2">
          {!state.IsLogin ? (
            <>
              <h1>INI BELUM LOGIN</h1>
              {musics.map((item) => (
                <Card className="text-nolink card-music bg-var-dark-gray mb-2">
                  {/* Button untuk trigger Login */}
                  <img src={item.thumbnail} class="card-image" alt="" />
                  <div className="d-flex justify-content-between mt-2 ">
                    <span className="fw-bold ">{item.title}</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="d-flex justify-content-start mt-2 ">
                    <span className="text-small">88rising</span>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <>
              <h1>INI SUDAH LOGIN</h1>

              {!state.user.subscribe ? (
                <>
                  <h1>BELUM BERLANGGANAN</h1>

                  {musics.map((item) => (
                    <Card className="text-nolink card-music bg-var-dark-gray mb-2">
                      <Link to="/pay">
                        <img src={item.thumbnail} class="card-image" alt="" />
                      </Link>
                      <div className="d-flex justify-content-between mt-2 ">
                        <span className="fw-bold ">{item.title}</span>
                        <span>{item.year}</span>
                      </div>
                      <div className="d-flex justify-content-between mt-2 ">
                        <span className="text-small">88rising</span>
                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                      </div>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <h1>BELUM BERLANGGANAN</h1>

                  {musics.map((item) => (
                    <Card className="text-nolink card-music bg-var-dark-gray mb-2">
                      <div onClick={() => setMusicId(item)}>
                        <img src={item.thumbnail} class="card-image" alt="" />
                      </div>
                      <div className="d-flex justify-content-between mt-2 ">
                        <span className="fw-bold ">{item.title}</span>
                        <span>{item.year}</span>
                      </div>
                      <div className="d-flex justify-content-between mt-2 ">
                        <span className="text-small">88rising</span>
                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                      </div>
                    </Card>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Player Music */}
      {musicId === "" ? (
        <></>
      ) : (
        <NavbarMusic className="fixed-bottom">
          <PlayerMusic musicId={musicId} />
        </NavbarMusic>
      )}
    </>
  );
}
