import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import NavbarAdmin from "../../components/NavbarAdmin";

import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const ListMusic = () => {
  const title = "List Music";
  document.title = "Dumbsound | " + title;

  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  const [musics, setMusics] = useState([]);

  const fecthMusic = async () => {
    const response = await API.get("/musics");
    setMusics(response.data.data.musics);
  };

  // Delete Music
  const deleteMusic = async (idMusic) => {
    try {
      await API.delete(`/music/${idMusic}`);
      fecthMusic();
    } catch (error) {
      console.log(error);
    }
  };

  // Navigation
  const addMusic = () => {
    navigate("/add-music");
  };

  const handleUpdate = (id) => {
    navigate(`/update-music/${id}`);
  };

  // UseEffect
  useEffect(() => {
    fecthMusic();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} nameUser={state.user.name} />
      <div className="container pt-5">
        <div className="d-flex mt-5">
          <h4>List Music</h4>
          <button onClick={addMusic} className="btn bg-var-dark-gray text-white ms-auto px-4">
            Add Music
          </button>
        </div>
        <table className="table table-dark table-striped mt-4">
          <thead>
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">Thumbnail</th>
              <th scope="col">Year</th>
              <th scope="col">Artis</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {musics?.map((item, index) => (
              <tr key={index} className="align-middle text-center">
                <th scope="row" style={{ height: "80px" }}>{`${index + 1}`}</th>
                <td>
                  <img src={item.thumbnail} alt="" width="50" />
                </td>
                <td>{item.title}</td>
                <td>{item.year}</td>
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

export default ListMusic;
