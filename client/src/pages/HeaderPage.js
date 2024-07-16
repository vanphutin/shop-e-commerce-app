import React from "react";
import { GiShop } from "react-icons/gi";
import "../assets/styles/pages/__header.scss";

const HeaderPage = () => {
  return (
    <header class="p-1 text-bg-dark">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            class="logo d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <GiShop />
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" class="nav-link px-2 text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="#" class="nav-link px-2 text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="#" class="nav-link px-2 text-white">
                Collections
              </a>
            </li>

            <li>
              <a href="#" class="nav-link px-2 text-white">
                About
              </a>
            </li>
          </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input
              type="search"
              class="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2">
              Login
            </button>
            <button type="button" class="btn btn-warning">
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
