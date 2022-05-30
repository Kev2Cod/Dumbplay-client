import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarAdmin from "../../components/NavbarAdmin";

import { toast } from "react-toastify";

import TagFile from "../../assets/icon/tag-file.svg";

import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const AddMusic = () => {
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState({});

  const loadUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      setUser(response.data.user.name);
    } catch (error) {}
  };

  useEffect(() => {
    loadUser();
  }, [state]);

  const navigate = useNavigate();

  const titleWeb = "Add Music";
  document.title = "Dumbsound | " + titleWeb;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [artiss, setArtiss] = useState([]);
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); // For image preview
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    attache: "",
    idArtis: "",
  });

  const { title, year, thumbnail, attache, idArtis } = form;

  // fetch Artis
  const fetchArtis = async () => {
    const response = await API.get("/artis");
    console.log(response.data.data.artiss);
    setArtiss(response.data.data.artiss);
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.id === "attache" ? e.target.files : e.target.value && e.target.id === "thumbnail" ? e.target.files : e.target.value,
    });

    if (e.target.id === "thumbnail") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      console.log(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submit");
    setLoadingSubmit(true);
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "multipart/form-data",
        },
      };
      console.log(form);

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("year", form.year);
      formData.set("fileSong", form.attache[0], form.attache[0].name);
      formData.set("imageSong", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("idArtis", form.idArtis);

      const response = await API.post("/add-music", formData, config);
      console.log(response);

      setLoadingSubmit(false);
      navigate("/list-music");
      toast.success("Add Music Success");
    } catch (error) {
      console.log(error);
      toast.error("Add Music Failed");
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    fetchArtis();
  }, []);

  return (
    <>
      <NavbarAdmin title={titleWeb} nameUser={user} />
      <Container className="pt-5">
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-start mb-4">Add Music</h3>

          <div className="d-flex mb-3">
            <div className="input-group me-3 ">
              <input type="text" placeholder="Title" name="title" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
            </div>

            <div>
              <input id="thumbnail" type="file" placeholder="Attach Thumnail" name="thumbnail" onChange={handleChange} accept="image/*" required hidden />
              <label for="thumbnail" className="form-attach px-2 py-2">
                <span>Attach Thumbnail</span> <img alt="" src={TagFile} className="text-end" height={25} />
              </label>
            </div>
          </div>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBlock: "1rem",
                }}
                alt=""
              />
            </div>
          )}

          <div className="input-group mb-3">
            <input type="number" placeholder="Year" name="year" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
          </div>

          <div className="input-group mb-3">
            <select className="form-select bg-var-dark text-white border-form" type="text" onChange={handleChange} name="idArtis" placeholder="Singer" required>
              <option value="" selected disabled>
                Singer
              </option>
              {artiss.map((item) => (
                <option key={item.id} name="type" value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group ">
            <label for="attache" className="form-attach px-2 py-2">
              <span> Attach Music</span> <img alt="" src={TagFile} className="text-end" height={25} />
            </label>

            <input id="attache" type="file" placeholder="Attach Music" name="attache" onChange={handleChange} accept="audio/*" required hidden />
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

export default AddMusic;
