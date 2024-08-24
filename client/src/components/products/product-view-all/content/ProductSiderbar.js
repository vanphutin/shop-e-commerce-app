import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../../../../assets/styles/components/view-all-product/__ProductSiderbar.scss";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../../services/apiServerviceCategorie";
import { getAllProducts } from "../../../../services/apiServerviceProduct";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const categoryName = location.state?.categoryName || ""; // Access the state here
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkRadio, setCheckRadio] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (checkRadio.length <= 0 && checkedItems.length <= 0) {
      fetchProducts(""); // Gọi fetchProducts mà không có tham số URL nếu không có bộ lọc nào
    } else if (checkRadio || (checkedItems && checkedItems.length > 0)) {
      updateURL();
    }
  }, [checkRadio, checkedItems]);

  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.code !== 200) {
        return toast.error("Don't get data Categories");
      }
      setCategories(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prevItems) =>
      checked
        ? [...prevItems, name]
        : Array.isArray(prevItems)
        ? prevItems.filter((item) => item !== name)
        : []
    );
  };
  const updateURL = () => {
    let url = "/products?";
    if (checkRadio) {
      url += `sort=${checkRadio}&`;
    }
    if (checkedItems && checkedItems.length > 0) {
      url += `categories=${checkedItems.join(",")}&`;
    }
    url = url.endsWith("&") ? url.slice(0, -1) : url;

    if (checkRadio.length <= 0 && checkedItems.length <= 0) {
      navigate("/products");
      url = "/products"; // URL mặc định nếu không có bộ lọc nào
      fetchProducts(""); // Fetch dữ liệu mặc định
    } else {
      fetchProducts(url); // Fetch dữ liệu dựa trên URL mới
    }

    // Điều hướng tới URL mới hoặc giữ nguyên nếu categoryName có giá trị
    navigate(categoryName.length > 0 ? "" : url);
  };

  const fetchProducts = async (url) => {
    try {
      const res = await getAllProducts(checkRadio, checkedItems);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRemoveCheck = () => {
    setCheckRadio("");
    setCheckedItems("");
    navigate("/products"); // Reset URL về mặc định
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <h2>Search filter</h2>
      </div>
      <ul>
        <h6>By Category</h6>
        <Form>
          <div className="mb-3">
            {categories.length > 0 &&
              categories.map((item) => (
                <Form.Check
                  inline
                  disabled={
                    checkedItems.length >= 2 &&
                    !checkedItems.includes(item.CategoryName)
                  }
                  value={item.CategoryName}
                  label={item.CategoryName}
                  key={item.CategoryID}
                  name={item.CategoryName}
                  onChange={handleChange}
                />
              ))}
          </div>
        </Form>
      </ul>
      <ul className="sort">
        <h6>By Sort Price</h6>
        <Form>
          <div className="mb-3">
            <Form.Check
              inline
              type="radio"
              id="incremental"
              label="Incremental"
              name="order"
              value="asc"
              checked={checkRadio === "asc"}
              onChange={(e) => setCheckRadio(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              id="decrease"
              label="Decrease"
              name="order"
              value="desc"
              checked={checkRadio === "desc"}
              onChange={(e) => setCheckRadio(e.target.value)}
            />
          </div>
        </Form>
      </ul>
      <div className="remove d-flex justify-content-center align-items-center">
        <button className="btn btn-danger btn-sm" onClick={handleRemoveCheck}>
          Remove option
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
