// ModalEdit.js
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormModal from "./FormModal";

export function ModalEdit({ show, handleClose, user, display }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormModal user={user} display={display} handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
}
