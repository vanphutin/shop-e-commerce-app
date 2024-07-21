import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/apiservices";

const RegisterPage = () => {
  const navigator = useNavigate();
  const [UserFirstName, setFirstName] = useState("");
  const [UserLastName, setLastName] = useState("");
  const [UserCity, setCity] = useState("");
  const [UserCountry, setCountry] = useState("");
  const [Gender, setGender] = useState("female");
  const [Birthday, setBirthday] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserPassword, setPassword] = useState("");
  const [UserEmail, setEmail] = useState("");
  const [Role, setRole] = useState("customer");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function isValidDate(dateString) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!regex.test(dateString)) {
      return false;
    }

    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return false;
    }

    return true;
  }

  const confirmResetText = () => {
    handleShow(true);
  };
  const handleResetForm = () => {
    setBirthday("");
    setCountry("");
    setCity("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setGender("female");

    handleClose();
  };
  const onOptionChange = (e) => {
    setGender(e.target.value);
  };

  const inputs = document.querySelectorAll("input");

  // Apply border styles based on input value
  inputs.forEach((item) => {
    if (item.value.trim() === "") {
      item.style.border = "1px solid red";
    } else item.style.border = "";
  });
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    // Apply border styles based on input value
    document.querySelectorAll("input").forEach((item) => {
      if (item.value.trim() === "") {
        item.style.border = "1px solid red";
      } else if (item.value.length > 1) {
        item.style.border = "1px solid black";
      } else {
        item.style.border = "";
      }
    });

    // Check for missing required fields
    if (
      !UserFirstName ||
      !UserLastName ||
      !UserCity ||
      !UserCountry ||
      !Birthday ||
      !UserName ||
      !UserPassword ||
      !UserEmail
    ) {
      return toast.error("Missing required fields");
    }

    // Check password length
    if (UserPassword.length < 6) {
      return toast.warning("Password is too short!");
    }

    // Validate birthday format
    if (!isValidDate(Birthday)) {
      return toast.error("Invalid birthday format | example: 2004-02-29");
    }

    try {
      const res = await postCreateUser(
        UserFirstName,
        UserLastName,
        UserCity,
        UserCountry,
        Birthday,
        UserName,
        UserPassword,
        UserEmail,
        Role,
        Gender
      );

      console.log("Response Status:", res.status);
      console.log("Response Data:", res.data);

      // Handle successful registration
      toast.success("Registration successful!");
      navigator("/login");
    } catch (error) {
      // Detailed logging of the error
      console.error("Error caught in catch block:", error);

      // Axios error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        toast.error(
          "An error occurred: " + (error.response.data.error || error.message)
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
        toast.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  return (
    <section className="h-100 bg-dark">
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src={
                      "https://cdn.prod.website-files.com/625816a3416990dd61391b9b/6443e29e088b01895754a5c4_6263d94e95d7beb9356d5894_6093df98353586694aa5aa1d_01.webp"
                    }
                    alt="Sample"
                    className="img-fluid"
                  />
                </div>
                <div className="col-xl-6">
                  <form onSubmit={handleSubmitForm}>
                    <div className="card-body  text-black">
                      <Link
                        to="/"
                        style={{
                          color: "#000",
                          fontWeight: "500",
                          textDecoration: "none",
                        }}
                      >
                        <p className="form-back">
                          <MdArrowBackIos />
                          Back home
                        </p>
                      </Link>
                      <h3 className="mb-5 text-uppercase text-center">
                        Registration
                      </h3>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                              placeholder="Jond"
                              value={UserFirstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            {" "}
                            <label
                              className="form-label"
                              htmlFor="form3Example1n"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                              placeholder="Ana"
                              value={UserLastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                              placeholder="Da Nang City"
                              value={UserCity}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            {" "}
                            <label
                              className="form-label"
                              htmlFor="form3Example1n"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                              placeholder="Viet Nam"
                              value={UserCountry}
                              onChange={(e) => setCountry(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender: </h6>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="femaleGender"
                            value="female"
                            checked={Gender === "female"}
                            onChange={onOptionChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="maleGender"
                            value="male"
                            checked={Gender === "male"}
                            onChange={onOptionChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="otherGender"
                            value="other"
                            checked={Gender === "other"}
                            onChange={onOptionChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            Other
                          </label>
                        </div>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example9">
                          DOB
                        </label>
                        <input
                          type="text"
                          id="form3Example9"
                          className="form-control form-control-lg"
                          placeholder="YYYY-MM-DD"
                          value={Birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example99">
                          Username
                        </label>
                        <input
                          type="text"
                          id="form3Example99"
                          className="form-control form-control-lg"
                          placeholder="jondana"
                          value={UserName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example97">
                          Email ID
                        </label>
                        <input
                          type="text"
                          id="form3Example97"
                          className="form-control form-control-lg"
                          placeholder="jondana@example.com"
                          value={UserEmail}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example90">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example90"
                          className="form-control form-control-lg"
                          placeholder="******"
                          value={UserPassword}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-light btn-lg"
                          onClick={confirmResetText}
                        >
                          Reset all
                        </button>
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-warning btn-lg ms-2"
                        >
                          Submit form
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="text-end"
                style={{
                  marginRight: "7px",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                <span>Already have an account?</span>{" "}
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModelComfirmResertText
        show={show}
        handleClose={handleClose}
        handleResetForm={handleResetForm}
      />
    </section>
  );
};

function ModelComfirmResertText({ show, handleClose, handleResetForm }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal confirm ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete them all?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleResetForm}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterPage;
