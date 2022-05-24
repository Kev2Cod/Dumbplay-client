import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import NavbarAdmin from "../../components/NavbarAdmin";

import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const ListArtis = () => {
  const title = "List Artis";
  document.title = "Dumbsound | " + title;

  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  const [artis, setArtis] = useState([]);

  const fecthArtis = async () => {
    try {
      const response = await API.get("/artis");
      setArtis(response.data.data.artiss);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Music
  const deleteMusic = async (idArtis) => {
    try {
      await API.delete(`/artis/${idArtis}`);
      fecthArtis();
    } catch (error) {
      console.log(error);
    }
  };

  // Navigation
  const addArtis = () => {
    navigate("/add-artis");
  };

  const handleUpdate = (id) => {
    navigate(`/update-artis/${id}`);
  };

  useEffect(() => {
    fecthArtis();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} nameUser={state.user.name} />
      <div className="container pt-5">
        <div className="d-flex mt-5">
          <h4>List Artis</h4>
          <button onClick={addArtis} className="btn bg-var-dark-gray text-white ms-auto px-4">
            Add Artis
          </button>
        </div>
        <table className="table table-dark table-striped mt-4">
          <thead>
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Old</th>
              <th scope="col">Type</th>
              <th scope="col">Start Career</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {artis?.map((item, index) => (
              <tr key={index} className="align-middle text-center">
                <th scope="row" style={{ height: "80px" }}>{`${index + 1}`}</th>
                <td>{item.name}</td>
                <td>{item.old}</td>
                <td>{item.type}</td>
                <td>{item.startCareer}</td>
                <td>
                  <button onClick={() => handleUpdate(item.id)} className="btn-green text-white me-2">
                    Edit
                  </button>
                  <button onClick={() => deleteMusic(item.id)} className="btn-red text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListArtis;
