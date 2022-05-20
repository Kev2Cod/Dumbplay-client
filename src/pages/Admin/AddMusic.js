import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container } from "react-bootstrap";
import NavbarAdmin from "../../components/NavbarAdmin";

import TagFile from "../../assets/icon/tag-file.svg";

const AddMusic = () => {
  const navigate = useNavigate();

  const title = "Add Music";
  document.title = "Dumbsound | " + title;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); // For image preview
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    attache: "",
    idArtis: "",
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="pt-5">
        <form className="mt-5">
          <h3 className="text-start mb-4">Add Music</h3>

          <div className="d-flex mb-3">
            <div className="input-group me-3 ">
              <input type="text" placeholder="Title" name="title" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
            </div>

            <div>
              <input id="attachThumbnail" type="file" placeholder="Attach Thumnail" name="attachImage" onChange={handleChange} required hidden />
              <label for="attachThumbnail" className="form-attach px-2 py-2">
                <span>Attach Thumbnail</span> <img alt="" src={TagFile} className="text-end" height={25} />
              </label>
            </div>
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Year" name="year" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
          </div>

          <div className="input-group mb-3">
            <input type="text" placeholder="Singer" name="singer" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
          </div>

          <div className="input-group ">
            <label for="attachMusic" className="form-attach px-2 py-2">
              <span> Attach Music</span> <img alt="" src={TagFile} className="text-end" height={25} />
            </label>

            <input id="attachMusic" type="file" placeholder="Attach Music" name="attachMusic" onChange={handleChange} required hidden />
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
