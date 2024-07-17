import "../assets/styles/pages/__header.scss";
import React from "react";
import { GiShop } from "react-icons/gi";
import { Link } from "react-router-dom";
import { TfiAlignJustify } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";

const HeaderPage = () => {
  const handleShowMenu = () => {
    const nav_menu = document.querySelectorAll(".show-phone");
    nav_menu.forEach((item) => {
      item.classList.toggle("show");
    });
  };
  return (
    <header className="p-1 text-bg-light">
      <nav className="container-fluid row  text-center">
        <div className="nav-icon__logo col-lg-2 col-6 col-md-4">
          <GiShop />
        </div>
        <div className="nav-icon__more d-md-none  col-6 text-end ">
          <TfiAlignJustify onClick={handleShowMenu} />
        </div>

        <div className="nav-menu d-none show-phone d-md-block col-xl-4 col-md-4">
          <ul className="nav-menu__item">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="nav-search d-none  d-xl-block col-xl-3 ">
          <form>
            <input type="text" name="" id="" placeholder="Search ..." />
            <span className="nav-search__icon-search">
              <CiSearch />
            </span>
          </form>
        </div>
        <div className="nav-auth col-12 show-phone d-none d-md-block col-xl-3 col-md-4">
          <button className="btn btn-info nav-auth__btn nav-auth__login">
            Login
          </button>
          <button className="btn btn-dark nav-auth__btn nav-auth__sign-up">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderPage;
