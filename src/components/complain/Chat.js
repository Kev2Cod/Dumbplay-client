import React from "react";
import { Container } from "react-bootstrap";
export default function Chat({ contact, user, messages, sendMessage }) {
  // console.log("Message: ", messages);
  // console.log("user: ", user);
  return (
    <>
      {contact ? (
        <>
          <div id="chat-messages" className=" h-100 chat-height d-flex flex-column overflow-auto">
            {messages ? (
              <>
                <div className="mt-auto">
                  {messages?.map((item, index) => (
                    <div key={index}>
                      <div className={`d-flex  ${item.idSender === user.id ? "justify-content-end pe-3 mb-2" : "justify-content-start pe-3 mb-2"}`}>
                        <div className={item.idSender === user.id ? "chat-me" : "chat-other"}>
                          <span className="">{item.message}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-100 d-flex justify-content-center align-items-center">
                <h1>No Massage</h1>
              </div>
            )}
            <div className="col-12">
              <div className="form px-2">
                <input placeholder="Send Message" className="my-2" onKeyPress={sendMessage} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <h5>Click Contact For Send Message</h5>
          </div>
        </>
      )}
    </>
  );
}
