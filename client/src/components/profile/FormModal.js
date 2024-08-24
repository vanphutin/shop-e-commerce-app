// FormModal.js
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { ModalEdit } from "./ModalEdit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../../services/apiservices";
import axios from "axios";
import { toast } from "react-toastify";

function FormModal({ user, display, disabled, handleClose }) {
  const [UserFirstName, setFirstName] = useState(user?.firstname || "");
  const [UserLastName, setLastName] = useState(user?.lastname || "");
  const [UserCity, setCity] = useState(user?.address?.city || "");
  const [UserCountry, setCountry] = useState(user?.address?.country || "");
  const [Gender, setGender] = useState(user?.gender || "female");
  const [Birthday, setBirthday] = useState(user?.birthday || "");
  const [UserAvatar, setUserAvatar] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const uploadFileAvatar = e.target.files[0];
    if (uploadFileAvatar) {
      setFile(URL.createObjectURL(uploadFileAvatar));
      setUserAvatar(uploadFileAvatar);
    }
  };
  const handleSubmitForm = async () => {
    try {
      const res = await updateUser(
        user?.id,
        UserFirstName,
        UserLastName,
        UserAvatar,
        UserCity,
        UserCountry,
        Gender
      );
      if (res.code !== 200) {
        return toast.error("Image to big !, again");
      }
      handleClose();
      return toast.success("Update success !");
    } catch (error) {
      throw new Error("Eror");
    }
  };
  return (
    <Form className="row">
      <Form.Group
        className="mb-3 col-6"
        controlId="formBasicAvatar"
        style={{ display: display ? "block" : "none" }}
      >
        <Form.Label className="d-block">Avatar</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          name="UserAvatar" // Change 'UserAvatar' to 'avatar'
          onChange={handleImageChange}
        />

        {file && <img src={file} alt="Avatar" style={{ width: "150px" }} />}
      </Form.Group>

      <Form.Group className="mb-3 ">
        <Form.Label className="d-block">Welcome Message</Form.Label>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formBasicLastname">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={UserLastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formBasicfirstname">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={UserFirstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formBasicBirthday">
        <Form.Label>Birth day</Form.Label>
        <Form.Control
          type="text"
          placeholder="Birth day"
          value={Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group
        className="mb-3 col-6"
        controlId="formBasicUseremail"
        style={{ display: !display ? "block" : "none" }}
      >
        <Form.Label>User email</Form.Label>
        <Form.Control
          type="text"
          placeholder="User email"
          defaultValue={user?.useremail}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="City"
          value={UserCity}
          onChange={(e) => setCity(e.target.value)}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formBasicCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Country"
          value={UserCountry}
          onChange={(e) => setCountry(e.target.value)}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formBasicGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          type="text"
          placeholder="Gender"
          value={Gender}
          onChange={(e) => setGender(e.target.value)}
          disabled={disabled}
        />
      </Form.Group>
      {!disabled && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Form>
  );
}

export default FormModal;
