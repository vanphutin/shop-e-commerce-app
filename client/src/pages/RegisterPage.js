import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

const RegisterPage = () => {
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
                    alt="Sample photo"
                    className="img-fluid"
                  />
                </div>
                <div className="col-xl-6">
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
                          <label className="form-label" for="form3Example1m">
                            First name
                          </label>
                          <input
                            type="text"
                            id="form3Example1m"
                            className="form-control form-control-lg"
                            placeholder="Jond"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          {" "}
                          <label className="form-label" for="form3Example1n">
                            Last name
                          </label>
                          <input
                            type="text"
                            id="form3Example1n"
                            className="form-control form-control-lg"
                            placeholder="Ana"
                          />
                        </div>
                      </div>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      {" "}
                      <label className="form-label" for="form3Example8">
                        Address
                      </label>
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        placeholder="123 street, USA"
                      />
                    </div>

                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                      <h6 className="mb-0 me-4">Gender: </h6>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="femaleGender"
                          value="option1"
                        />
                        <label className="form-check-label" for="femaleGender">
                          Female
                        </label>
                      </div>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="maleGender"
                          value="option2"
                        />
                        <label className="form-check-label" for="maleGender">
                          Male
                        </label>
                      </div>

                      <div className="form-check form-check-inline mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="otherGender"
                          value="option3"
                        />
                        <label className="form-check-label" for="otherGender">
                          Other
                        </label>
                      </div>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" for="form3Example9">
                        DOB
                      </label>
                      <input
                        type="text"
                        id="form3Example9"
                        className="form-control form-control-lg"
                        placeholder="MM-DD-YYYY"
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" for="form3Example99">
                        Username
                      </label>
                      <input
                        type="text"
                        id="form3Example99"
                        className="form-control form-control-lg"
                        placeholder="jondana"
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" for="form3Example97">
                        Email ID
                      </label>
                      <input
                        type="text"
                        id="form3Example97"
                        className="form-control form-control-lg"
                        placeholder="jondana@example.com"
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" for="form3Example90">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example90"
                        className="form-control form-control-lg"
                        placeholder="******"
                      />
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-light btn-lg"
                      >
                        Reset all
                      </button>
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-warning btn-lg ms-2"
                      >
                        Submit form
                      </button>
                    </div>
                  </div>
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
    </section>
  );
};

export default RegisterPage;
