import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createCategory } from "../../../../../services/apiServiceCategory";
import { toast } from "react-toastify";

const CreateCategoryModal = ({ show, handleClose, onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCreateCategory = async () => {
    try {
      const res = await createCategory({ CategoryName: categoryName });
      // ("Response:");

      if (res.data.code === 201) {
        toast.success("Category created successfully.");
        onCategoryCreated();
        handleClose();
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      // Log lỗi với thông tin chi tiết từ server hoặc thông báo lỗi cơ bản
      console.error(
        "Error creating category:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response
          ? error.response.data.message || "Failed to create category."
          : "Failed to create category."
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          name="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="form-control mb-3"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateCategory}>
          Save Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategoryModal;
