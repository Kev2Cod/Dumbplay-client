import React from "react";
import { Container } from "react-bootstrap";
export default function Chat() {
  const loopData = [1, 2, 3, 4, 5];
  return (
    <>
      <div id="chat-messages" className="chat-height d-flex flex-column overflow-auto">
        <div className="mt-auto">
          <div>
            <div className="d-flex justify-content-end pe-3 mb-2">
              <div className="chat-me">
                <span className="">Halo ini dengan admin 1?</span>
              </div>
            </div>
            <div className="d-flex justify-content-start pe-3 mb-2">
              <div className="chat-other">
                <span className="">Halo ini dengan admin 1?</span>
              </div>
            </div>
            <div className="d-flex justify-content-start pe-3 mb-2">
              <div className="chat-other">
                <span className="">Halo ini dengan admin 1?</span>
              </div>
            </div>
            <div className="d-flex justify-content-start pe-3 mb-2">
              <div className="chat-other">
                <span className="">Halo ini dengan admin 1?</span>
              </div>
            </div>
            <div className="d-flex justify-content-start pe-3 mb-2">
              <div className="chat-other">
                <span className="">Halo ini dengan admin 1?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="form px-2">
          <input placeholder="Send Message" className="my-2" />
        </div>
      </div>
    </>
  );
}
