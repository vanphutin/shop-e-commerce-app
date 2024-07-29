// Sidebar.js
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../../../../assets/styles/components/view-all-product/__ProductSiderbar.scss";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../../services/apiServerviceCategorie";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.code !== 200) {
        return toast.error("don't get data Categories ");
      }
      setCategories(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, checked } = e.target;

    let newCheckedItems;
    if (checked) {
      newCheckedItems = [...checkedItems, name];
    } else {
      newCheckedItems = checkedItems.filter((item) => item !== name);
    }
    setCheckedItems(newCheckedItems);

    // Cập nhật URL với các category đã chọn
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
              categories.map((items) => (
                <Form.Check
                  inline
                  disabled={
                    checkedItems.length >= 2 &&
                    !checkedItems.includes(items.CategoryName)
                  }
                  label={`${items.CategoryName}`}
                  key={items.CategoryID}
                  name={`${items.CategoryName}`}
                  onChange={handleChange}
                />
              ))}
          </div>
        </Form>
        {/* Thêm các liên kết khác nếu cần */}
      </ul>
      <ul>
        <h6>By Sort</h6>
        <Form>
          <div className="mb-3">
            <Form.Check
              inline
              type="radio"
              id="check-box"
              label="Incremental"
              name="checkbox"
            />
            <Form.Check
              inline
              type="radio"
              id="check-box-2"
              label="Decrease"
              name="checkbox"
            />
          </div>
        </Form>
        {/* Thêm các liên kết khác nếu cần */}
      </ul>
    </div>
  );
};

export default Sidebar;
