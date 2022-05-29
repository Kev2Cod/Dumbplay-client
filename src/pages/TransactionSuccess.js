import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import imgSuccess from "../assets/image/payment-success.jpg";

import { UserContext } from "../context/userContext";

export default function TransactionSuccess() {
  const [state] = useContext(UserContext);

  const title = "Success";
  document.title = "Dumbsound | " + title;

  const redirect = () => {
    return <Link push to="/" />;
  };

  setTimeout(function () {
    redirect();
  }, 3000);

  return (
    <>
      <Navbar title={title} nameUser={state.user.name} />
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div className="text-center">
          <img src={imgSuccess} alt="payment success" width="500" />
          <h3>Pembayaran berhasi!</h3>
        </div>
      </div>
    </>
  );
}
