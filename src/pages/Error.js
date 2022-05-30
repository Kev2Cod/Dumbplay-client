import React from "react";
import Navbar from "../components/Navbar";
// import Image from "../assets/static/media/error.svg";

export const Error = () => {
  const title = "Error";
  document.title = "Dumbsound | " + title;
  return (
    <>
      <Navbar title={title} />
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "90vh" }}>
        {/* <img src={Image} style={{ maxWidth: "60vh" }} /> */}
        <h3 className="mt-3">Waduh, Tujuanmu nggak ada!😱</h3>
        <p>Mungkin kamu salah jalan atau alamat. Ayo balik sebelum gelap</p>
      </div>
    </>
  );
};

export default Error;
