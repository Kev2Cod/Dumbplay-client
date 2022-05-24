import React, { useContext } from "react";
import { useQuery } from "react-query";

import NavbarAdmin from "../../components/NavbarAdmin";

import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

export const ListMusic = () => {
  const title = "Home";
  document.title = "Dumbsound | " + title;

  const [state] = useContext(UserContext);

  let { data: musics } = useQuery("");

  return (
    <>
      <NavbarAdmin title={title} nameUser={state.user.name} />
      <div className="container mt-3 mb-5">
        <div className="d-flex">
          <h4>List Product</h4>
          {/* <button onClick={addProduct} className="btn bg-var-dark-gray text-white ms-auto px-4">
            Add
          </button> */}
        </div>
        {products?.length !== 0 ? (
          <table className="table table-dark table-striped mt-3 ">
            <thead>
              <tr className="text-center">
                <th scope="col">No</th>
                <th scope="col">thumbnail</th>
                <th scope="col">title</th>
                <th scope="col">attache</th>
                <th scope="col"></th>
                <th scope="col">Qty</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isError ? (
                <>
                  {!isLoading ? (
                    <>
                      {products?.map((item, index) => (
                        <tr key={item.id} className="align-middle text-center">
                          <th scope="row">{`${index + 1}`}</th>
                          <td>
                            <img src={item.image} alt="" className="image-list-product" />
                          </td>
                          <td> {`${item.name.slice(0, 16)}...`}</td>
                          <td>{`${item.desc.slice(0, 16)}`}</td>
                          <td>{convertRupiah.format(item.price)}</td>
                          <td>{item.qty}</td>
                          <td className="text-center">
                            <button onClick={() => handleUpdate(item.id)} className="btn bg-var-green text-white fw-bold " style={{ width: "6rem" }}>
                              Edit
                            </button>

                            <button to="/delete-product" onClick={() => handleDelete(item.id)} className="btn bg-var-red text-white fw-bold m-1" style={{ width: "6rem" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <th colSpan={7} className="p-3 ">
                          <div className="sk-chase m-auto">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                          </div>
                        </th>
                      </tr>
                    </>
                  )}
                </>
              ) : (
                <>
                  <tr className="align-middle text-center ">
                    <th colSpan={7}>
                      <span className="fw-light">Connection error, Please refresh browser....</span>
                    </th>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            {/* <img src={imgEmpty} style={{ width: "30%" }} alt="empty" /> */}
            <h5 className="mt-4">No Data Product</h5>
          </div>
        )}
        {/* <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} /> */}
      </div>
    </>
  );
};
