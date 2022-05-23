import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { Popover, OverlayTrigger } from "react-bootstrap";
import NavbarAdmin from "../../components/NavbarAdmin";

import IconPolygonDown from "../../assets/icon/polygon-down-gray.svg";

import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const Transaction = () => {
  // Untuk Navbar Admin
  // useState
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

  const title = "Transactions";
  document.title = "Dumbsound | " + title;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await API.get("/transactions");
        console.log("GET TRANSAKSI: ", response.data.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadTransactions();
  }, []);

  // dropdown profile
  const content = (
    <Popover variant="dark" id="dropdown" className="list-dropdown ">
      <Popover.Body className="bg-var-dark-gray">
        <ul class="list-unstyled ">
          <>
            <li>
              <button className="btn-red text-var-red">Shutdown</button>
            </li>
          </>
        </ul>
      </Popover.Body>
    </Popover>
  );

  // Set Duration
  const remainingActive = (startDate, dueDate, idTransaction) => {
    if (!startDate && !dueDate) {
      //? fungsinya
      return 0;
    }

    const date1 = new Date();
    const date2 = new Date(dueDate);
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days <= 0) {
      // Set data to History

      // Delete Transaction

      return 0;
    }
    return Math.round(Difference_In_Days);
  };

  // jika remaining active ada, dan status user active, maka subscribe user jadi true

  // ? tangkap subscribe usernya.

  return (
    <>
      <NavbarAdmin title={title} nameUser={user} />
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
                <td>{remainingActive(item?.startDate, item?.dueDate, item.id)}/Hari</td>
                <td>active</td>
                <td className={`status-transaction-${item.status}`}>{item.status}</td>

                <td>{item.paymentMethod}</td>
                <td>
                  <OverlayTrigger trigger="click" placement="bottom" overlay={content}>
                    <img src={IconPolygonDown} alt="" />
                  </OverlayTrigger>
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
