import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container } from "react-bootstrap";
import "../../styles/loading.css";

import NavbarAdmin from "../../components/NavbarAdmin";

import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const AddArtis = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Untuk Navbar
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState({});

  const loadUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      console.log(response.data.user.name);
      setUser(response.data.user.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, [state]);

  // =========================================================

  const title = "Add Artis";
  document.title = "Dumbsound | " + title;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    old: "",
    type: "",
    startCareer: "",
  });

  const fetchArtis = async () => {
    const config = {
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/artis/" + id, config);
    console.log(response.data.data);
    setForm({
      name: response.data.data.name,
      old: response.data.data.old,
      type: response.data.data.type,
      startCareer: response.data.data.startCareer,
    });
  };

  const { name, old, type, startCareer } = form;

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoadingSubmit(true);
    e.preventDefault();
    try {
      setLoadingSubmit(false);

      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      const response = await API.patch("/artis/" + id, body, config);
      console.log("berhasi!", response);
      navigate("/list-artis");
    } catch (error) {
      console.log(error);
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    fetchArtis();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} nameUser={user} />
      <Container className="pt-5">
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-start mb-4">Add Artis</h3>

          <div className="input-group mb-3">
            <input type="text" placeholder="Name" name="name" onChange={handleChange} value={name} className="form-control bg-var-dark text-white border-form" required />
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Old" name="old" onChange={handleChange} value={old} className="form-control bg-var-dark text-white border-form" required />
          </div>

          <div className="input-group mb-3">
            <select className="form-select bg-var-dark text-white border-form" type="text" onChange={handleChange} value={type} name="type" placeholder="Type" required>
              <option value="" selected disabled>
                Type
              </option>
              <option name="type">Solo</option>
              <option name="type">Band</option>
            </select>
          </div>

          <div className="input-group mb-3">
            <input type="text" placeholder="Start a Career" name="startCareer" onChange={handleChange} value={startCareer} className="form-control bg-var-dark text-white border-form" required />
          </div>

          {!loadingSubmit ? (
            <>
              <button type="submit" className="btn-orange text-white fw-bold container my-3">
                Save
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn-orange blink text-white fw-bold container my-3" disable>
                Process....
              </button>
            </>
          )}
        </form>
      </Container>
    </>
  );
};

export default AddArtis;
