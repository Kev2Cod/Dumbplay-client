import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";

const Transaction = () => {
  const title = "Transactions";
  document.title = "Dumbsound | " + title;
  const loopData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <NavbarAdmin title={title} />
      <div className="container pt-5">
        <div className="mt-4">
          <h4>Incoming Transaction</h4>
        </div>
        <table className="table table-dark table-striped mt-4 ">
          <thead>
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">User</th>
              <th scope="col">Remaining Active</th>
              <th scope="col">Status User</th>
              <th scope="col">Status Payment</th>
              <th scope="col">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {loopData.map((item, index) => (
              <tr className="align-middle text-center">
                <th scope="row" style={{ height: "80px" }}>{`${index + 1}`}</th>
                <td>Kevin Williams</td>
                <td>26/Hari</td>
                <td>Active</td>
                <td>Success</td>
                <td>Credit Card</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;
