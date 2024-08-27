import React, { useContext, useState } from "react";
import login_img from "../assets/images/auth/login.jpg";
import "../assets/styles/pages/__login.scss";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/images/auth/google.png";
import facebook from "../assets/images/auth/fb.png";
import apple from "../assets/images/auth/apple.png";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import { postLogin } from "../services/apiservices";
import { AuthContext } from "../context/AuthProvider";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigator = useNavigate();
  const [UserPassword, setPassword] = useState("");
  const [UserEmail, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const res = await postLogin(UserEmail, UserPassword);
      if (res.code === 200) {
        toast.success("Login success");
        setLoading(true);
        navigator("/");
      }
      // ("user", res);
      localStorage.setItem("token", res.token);
      setUser(res.data);
    } catch (error) {
      console.error("Error caught in catch block:", error);

      // Axios error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error("An error occurred: " + error.response.data.message);
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
        toast.error("No response received from the server.", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-main row ">
        <div className="login-banner  col-12 col-md-6 ">
          <img src={login_img} alt="" className="login-banner__img " />
        </div>
        <div className="login-form col-12 col-md-6 ">
          <form onSubmit={handleSubmitForm}>
            <div className="form-title text-center">
              <h2>LOGIN</h2>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example1">
                Email address
              </label>
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                value={UserEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example2">
                Password
              </label>
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                value={UserPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="row mb-4">
              <div className="col text-end">
                <Link to="/forgor-password">Forgot password?</Link>
              </div>
            </div>

            {!loading ? (
              <button
                type="submit"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-block mb-4 btn-login "
              >
                Sign in
              </button>
            ) : (
              <p>Loading</p>
            )}

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
