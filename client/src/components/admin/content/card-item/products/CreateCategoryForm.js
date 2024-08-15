import React, { useState } from "react";
import { createCategory } from "../../../../../services/apiServerviceCategorie";
import { toast } from "react-toastify";

const CreateCategoryForm = ({
  onCategoryCreated,
  showBtn,
  CategoryNameID,
  disabled,
}) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory({ CategoryName: categoryName });
      if (res.code === 201) {
        toast.success("Category created successfully.");
        onCategoryCreated();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error creating category:", error.response.data.message);
      toast.error(error.response.data.message);
      setCategoryName("");
    }
  };

  return (
    <div className="mb-3  d-flex">
      <input
        type="text"
        name="categoryName"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder={CategoryNameID}
        disabled={disabled}
        className="form-control mb-3 w-50"
      />
      {showBtn ? (
        <button className="btn btn-dark btn-sm" onClick={handleCreateCategory}>
          + Create Category
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateCategoryForm;
