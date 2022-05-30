import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { Popover, OverlayTrigger } from "react-bootstrap";
import NavbarAdmin from "../../components/NavbarAdmin";

import { toast } from "react-toastify";

import IconPolygonDown from "../../assets/icon/polygon-down-gray.svg";

import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const Transaction = () => {
  const [state] = useContext(UserContext);

  const title = "Transactions";
  document.title = "Dumbsound | " + title;

  const [transactions, setTransactions] = useState([]);

  // Fetch Transaction
  let fetchTransaction = async () => {
    const response = await API.get("/transactions");
    setTransactions(response.data.data);
  };

  // Set Duration
  const remainingActive = (startDate, dueDate, idTransaction, idUser) => {
    if (!startDate && !dueDate) {
      return 0;
    }

    // perhitungan hari
    const date1 = new Date();
    const date2 = new Date(dueDate);
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    // Jika Masa aktif telah habis
    if (Difference_In_Days === 0) {
      // Delete Transaction
      const deleteTransaction = async () => {
        try {
          console.log("Hapus Transaksi & ubah status user Berhasi!");

          const config = {
            headers: {
              Authorization: "Basic " + localStorage.token,
              "Content-type": "application/json",
            },
          };

          // Delete Transaction
          await API.delete("/transaction/" + idTransaction, config);

          // Ubah status subscribe di user jadi false
          let setSubscribe = {
            subscribe: "false",
          };

          setSubscribe = JSON.stringify(setSubscribe);
          // change status subscribe in user to false
          await API.patch("user/" + idUser, setSubscribe, config);
          toast.success("Delete Transaction Success");
        } catch (error) {
          toast.failed("Delete Transaction Failed");
          console.log(error);
        }
      };

      deleteTransaction();
      return 0;
    }
    return Difference_In_Days;
  };

  // Delete Transaksi
  const deleteTransaction = async (idTransaction, idUser) => {
    try {
      console.log("Hapus Transaksi & ubah status user Berhasi!");

      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      // Delete Transaction
      await API.delete("/transaction/" + idTransaction, config);

      // Ubah status subscribe di user jadi false
      let setSubscribe = {
        subscribe: "false",
      };

      setSubscribe = JSON.stringify(setSubscribe);

      await API.patch("user/" + idUser, setSubscribe, config);

      fetchTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} nameUser={state.user.name} />
      <div className="container pt-5">
        <div className="mt-4">
          <h4>Incoming Transaction</h4>
        </div>
        <table className="table table-dark table-striped mt-4">
          <thead>
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">User</th>
              <th scope="col">Remaining Active</th>
              <th scope="col">Status User</th>
              <th scope="col">Status Payment</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item, index) => (
              <tr key={index} className="align-middle text-center">
                <th scope="row" style={{ height: "80px" }}>{`${index + 1}`}</th>
                <td>{item.user.name}</td>
                <td>{remainingActive(item?.startDate, item?.dueDate, item.id, item.user?.id)}/Hari</td>
                {item.user.subscribe ? <td className="text-var-green">Active</td> : <td className="text-var-red">Shutdown</td>}
                <td className={`status-transaction-${item.status}`}>{item.status}</td>
                <td>{item.paymentMethod}</td>
                <td>
                  <button onClick={() => deleteTransaction(item.id, item.user.id)} className="btn-red text-white">
                    Shutdown
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

export default Transaction;
