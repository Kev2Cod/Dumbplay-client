import React, { useState, useContext } from "react";
import Img from "../assets/image/Jumbotron.png";
import { Card, Navbar as NavbarMusic } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { useQuery } from "react-query";

import Navbar from "../components/Navbar";
import PlayerMusic from "../components/PlayerMusic";
import Login from "../components/modal/Login";

import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const title = "Home";
  document.title = "Dumbsound | " + title;

  // handle for open login
  const [isClickLogin, setIsClickLogin] = useState(false);
  const handleClickLogin = () => setIsClickLogin(!isClickLogin);

  const [state] = useContext(UserContext);
  const [musicId, setMusicId] = useState("");
  console.log(musicId);

  // Fetch Music
  let { data: musics, isLoading } = useQuery("musicCache", async () => {
    const response = await API.get("/musics");
    return response.data.data.musics;
  });

  console.log(musics);

  return (
    <>
      <Navbar title={title} nameUser={state.user.name} />

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
        <div className="musics d-flex flex-wrap gap-3 justify-content-start mt-2">
          {!state.isLogin ? (
            <>
              {/* Belum Login */}
              {musics?.map((item) => (
                <Card key={item.id} className="card-music bg-var-dark-gray mb-2">
                  {/* Button untuk trigger Login */}
                  <div onClick={handleClickLogin}>
                    <img src={item.thumbnail} class="card-image" alt="" />
                  </div>
                  <div className="d-flex justify-content-between mt-2 ">
                    <span className="fw-bold ">{item.title.slice(0, 15)}</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="d-flex justify-content-start mt-2 ">
                    <span className="text-small">{item.artis.name}</span>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <>
              {/* Sudah Login */}
              {!state.user.subscribe ? (
                // Belum berlangganan
                <>
                  {musics?.map((item) => (
                    <Card key={item.id} className="text-nolink card-music bg-var-dark-gray mb-2">
                      <Link to="/pay">
                        <img src={item.thumbnail} class="card-image" alt="" />
                      </Link>
                      <div className="d-flex justify-content-between mt-2 ">
                        <span className="fw-bold ">{item.title}</span>
                        <span>{item.year}</span>
                      </div>
                      <div className="d-flex justify-content-start mt-2 ">
                        <span className="text-small">{item.title.slice(0, 15)}</span>
                      </div>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  {/* Sudah berlangganan */}
                  {musics?.map((item) => (
                    <Card key={item.id} className="text-nolink card-music bg-var-dark-gray mb-2">
                      <div onClick={() => setMusicId(item)}>
                        <img src={item.thumbnail} class="card-image" alt="" />
                      </div>
                      <div className="d-flex justify-content-between mt-2 ">
                        <span className="fw-bold ">{item.title}</span>
                        <span>{item.year}</span>
                      </div>
                      <div className="d-flex justify-content-start mt-2 ">
                        <span className="text-small">{item.title.slice(0, 15)}</span>
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

      {isClickLogin ? <Login isOpen={isClickLogin} /> : null}
    </>
  );
}
