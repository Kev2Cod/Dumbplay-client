import React, { useContext, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import { Home, Transaction, AddMusic, AddArtis, Pricing, Error, ListMusic, ListArtis, UpdateMusic, UpdateArtis, TransactionSuccess } from "./pages/Index";
import Complain from "./pages/Complain";
import ComplainAdmin from "./pages/Admin/ComplainAdmin";

import { UserContext } from "./context/userContext";
import { setAuthToken, API } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  // const navigate = useNavigate();

  // Init user context
  const [state, dispatch] = useContext(UserContext);

  // Create function for "check user token"
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/pay" element={<Pricing />} />
        <Route path="/list-music" element={<ListMusic />} />
        <Route path="/list-artis" element={<ListArtis />} />
        <Route path="/add-music" element={<AddMusic />} />
        <Route path="/add-artis" element={<AddArtis />} />
        <Route path="/update-music/:id" element={<UpdateMusic />} />
        <Route path="/update-artis/:id" element={<UpdateArtis />} />
        <Route path="/transaction-success" element={<TransactionSuccess />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      {state.isLogin ? state?.user?.status === "admin" ? <ComplainAdmin /> : <Complain /> : <></>}
    </>
  );
}

export default App;
