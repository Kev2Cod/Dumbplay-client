import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container } from "react-bootstrap";
import NavbarAdmin from "../../components/NavbarAdmin";

const AddArtis = () => {
  const navigate = useNavigate();
  const title = "Add Artis";
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
          <h3 className="text-start mb-4">Add Artis</h3>

          <div className="input-group mb-3">
            <input type="text" placeholder="Name" name="name" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Old" name="old" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
          </div>

          <div className="input-group mb-3">
            <input type="text" placeholder="Solo" name="type" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
          </div>
          <div className="input-group mb-3">
            <input type="text" placeholder="Start a Career" name="career" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required />
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
