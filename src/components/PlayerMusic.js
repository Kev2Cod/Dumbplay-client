import React from "react";
import { Navbar } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function PlayerMusic({ musicId }) {
  console.log(musicId?.attache);
  return (
    <div>
      <Navbar fluid className="fixed-bottom navPlay">
        <div className="d-flex align-items-center">
          <img src={musicId?.thumbnail} alt="" className="img-music mx-4" />
          <span className="judul-music">
            {musicId?.title} - {musicId?.artis.name}
          </span>
        </div>
        <AudioPlayer autoPlay src={musicId?.attache} layout="horizontal" className="player" />
      </Navbar>
    </div>
  );
}

export default PlayerMusic;
