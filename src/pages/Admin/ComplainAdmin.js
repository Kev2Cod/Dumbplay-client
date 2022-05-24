import React, { useState, useEffect, useContext } from "react";
import "../../styles/complain.css";
import { Container, Row, Col } from "react-bootstrap";

import IconChat from "../../assets/icon/chat.svg";
import Chat from "../../components/complain/Chat";
import Contact from "../../components/complain/Contact";

import { UserContext } from "../../context/userContext";

// import package socket
import { io } from "socket.io-client";

// init variable socket
let socket;

const ComplainAdmin = () => {
  const [show, setShow] = useState(false);

  function handleClickChat() {
    // console.log("SHOW");
    setShow(!show);
  }

  const title = "Complain";
  document.title = "DumbMerch | " + title;

  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [state] = useContext(UserContext);

  // connect to server in useEffect function
  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"), // we must set options to get access to socket server
      },
      query: {
        id: state.user.id,
      },
    });

    // define corresponding socket listener
    socket.on("new message", () => {
      console.log("contact", contact);
      console.log("triggered", contact?.id);
      socket.emit("load messages", contact?.id);
    });

    loadContact();
    loadMessages();

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const loadContact = () => {
    // emit event to load admin contact
    socket.emit("load customers contact");

    // listen event to get admin contact
    socket.on("customers contact", (data) => {
      let dataContact = data.filter((item) => item.status !== "admin" && (item.recipientMessage.length >= 0 || item.senderMessage.length >= 0));

      dataContact = dataContact.map((item) => {
        return {
          ...item,
          message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start message",
        };
      });

      // console.log(dataContact);
      setContacts(dataContact);
    });
  };

  const onClickContact = (data) => {
    // console.log("On Click Contact ", data);
    setContact(data);

    socket.emit("load messages", data.id);
  };

  const loadMessages = (value) => {
    // listen event to get admin contact
    socket.on("customers contact", (data) => {
      socket.on("messages", async (data) => {
        if (data.length > 0) {
          const dataMessages = data.map((item) => ({
            idSender: item.sender.id,
            message: item.message,
          }));
          console.log("Data Messages", dataMessages);
          setMessages(dataMessages);
        } else {
          const dataMessages = null;
          console.log("Data Messages", dataMessages);
          setMessages(dataMessages);
        }
        const chatMessages = document.getElementById("chat-messages");
        chatMessages.scrollTop = chatMessages?.scrollHeight;
      });
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      socket.emit("send messages", data);
      e.target.value = "";
    }
  };

  return (
    <>
      <button class="open-button" onClick={handleClickChat}>
        <img src={IconChat} alt="" />
      </button>
      <div class="chat-popup" style={{ display: show ? "block" : "none" }} id="myForm">
        <div class="form-container">
          {/* Chat */}

          <Container fluid>
            <Row>
              <Col md={12} className="mb-2">
                <div className="d-flex justify-content-between align-items-center ">
                  <label for="msg" className="fs-5">
                    <span>
                      <b>Complain Admin</b>
                    </span>
                  </label>
                  <button type="button" class="btn cancel " onClick={handleClickChat}>
                    x
                  </button>
                </div>
              </Col>
              <Col md={4} className="complain-height border-end overflow-auto">
                <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
              </Col>

              <Col md={8} className="complain-height ">
                <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ComplainAdmin;
