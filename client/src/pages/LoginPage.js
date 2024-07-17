import React from "react";
import login_img from "../assets/images/auth/login.jpg";
import "../assets/styles/pages/__login.scss";
import { Link } from "react-router-dom";
import google from "../assets/images/auth/google.png";
import facebook from "../assets/images/auth/fb.png";
import apple from "../assets/images/auth/apple.png";
import { MdArrowBackIos } from "react-icons/md";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="login-main row ">
        <div className="login-banner  col-12 col-md-6 ">
          <img src={login_img} alt="" className="login-banner__img " />
        </div>
        <div className="login-form col-12 col-md-6 ">
          <form>
            <div className="form-title text-center">
              <h2>LOGIN</h2>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" for="form2Example1">
                Email address
              </label>
              <input type="email" id="form2Example1" className="form-control" />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" for="form2Example2">
                Password
              </label>
              <input
                type="password"
                id="form2Example2"
                className="form-control"
              />
            </div>

            <div className="row mb-4">
              <div className="col text-end">
                <Link to="/forgor-password">Forgot password?</Link>
              </div>
            </div>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary btn-block mb-4 btn-login "
            >
              Sign in
            </button>

            <div className="text-center">
              <p>or sign up with:</p>

              {/* google */}
              <Link to="#" className="form-logo">
                <img src={google} alt="" />
              </Link>
              {/* facebook */}
              <Link
                to="#"
                className="form-logo"
                style={{ margin: "10px 15px" }}
              >
                <img src={facebook} alt="" />
              </Link>
              {/* apple */}
              <Link to="#" className="form-logo">
                <img src={apple} alt="" />
              </Link>

              <p className="form__nagivate">
                Don't have an account ? <Link to="/sign-up">Register here</Link>
              </p>
            </div>
            <div className="text-end">
              <Link to="/">
                <p className="form-back">
                  <MdArrowBackIos />
                  Back home
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
