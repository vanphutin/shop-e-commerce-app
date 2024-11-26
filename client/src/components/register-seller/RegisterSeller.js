import React, { useContext, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { patchRegisterSeller } from "../../services/apiservices";
import seller from "../../assets/images/role/seller.gif";
import { AuthContext } from "../../context/AuthProvider";

const RegisterSeller = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [UserFirstName, setFirstName] = useState(user?.firstname || "");
  const [UserLastName, setLastName] = useState(user?.lastname || "");
  const [UserCity, setCity] = useState(user?.address?.city || "");
  const [UserCountry, setCountry] = useState(user?.address?.country || "");
  const [UserAvatar, setUserAvatar] = useState(null);
  const [Role] = useState("seller");
  const [file, setFile] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmResetText = () => {
    handleShow();
  };

  const handleResetForm = () => {
    setCountry("");
    setCity("");
    setFirstName("");
    setLastName("");
    setUserAvatar(null);
    handleClose();
  };

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
      !UserAvatar
    ) {
      return toast.error("Missing required fields");
    }

    try {
      const res = await patchRegisterSeller(
        id,
        UserFirstName,
        UserLastName,
        UserCity,
        UserCountry,
        UserAvatar,
        Role
      );
      console.log("res", res);

      // Handle successful registration
      toast.success("Registration successful!");
      navigate("/"); // Navigate to the desired path
    } catch (error) {
      // Detailed logging of the error
      toast.error("Error caught in catch block:", error.response.data);

      // Axios error handling
      if (error.response) {
        console.error("Error Response Data:", error.response.data.message);
        console.error("Error Response Status:", error.response.status);
        toast.error(
          "An error occurred: " + (error.response.data.error || error.message)
        );
      } else if (error.request) {
        console.error("Error Request:", error.request);
        toast.error("No response received from the server.");
      } else {
        console.error("Error Message:", error.message);
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    const uploadFileAvatar = e.target.files[0];
    if (uploadFileAvatar) {
      setUserAvatar(uploadFileAvatar);
    }
  };

  return (
    <section className="h-100 ">
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block d-flex justify-content-center align-items-center">
                  <img src={seller} alt="Sample" className="img-fluid m-5" />
                </div>
                <div className="col-xl-6">
                  <form onSubmit={handleSubmitForm}>
                    <div className="card-body text-black">
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
                        Registration{" "}
                        <span style={{ color: "blue" }}>Seller</span>
                      </h3>

                      <div className="row">
                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example99"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            id="form3Example99"
                            className="form-control form-control-lg"
                            placeholder="jondana"
                            value={user?.username || " no value"}
                            disabled
                          />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form3Example97"
                          >
                            Email ID
                          </label>
                          <input
                            type="text"
                            id="form3Example97"
                            className="form-control form-control-lg"
                            placeholder="jondana@example.com"
                            value={user?.useremail || " no value"}
                            disabled
                          />
                        </div>

                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              Shop name
                            </label>
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                              placeholder="Gucci"
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
                              Store
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

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example99">
                          Avatar
                        </label>
                        <input
                          type="file"
                          id="form3Example99"
                          className="form-control form-control-lg"
                          accept="image/*"
                          name="UserAvatar"
                          onChange={handleImageChange}
                        />
                        <img src={file} alt="" style={{ width: "200px" }} />
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
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Reset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to reset the form?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={handleResetForm}>
                        Reset
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSeller;
