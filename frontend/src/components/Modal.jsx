import React, { useState } from "react";

function Modal({
  modalBody,
  modalTitle,
  modalButton,
  showModal,
  setShowModal,
}) {
  return (
    <>
      {showModal && (
        <div
          className="modal"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">{modalBody}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                {modalButton}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
