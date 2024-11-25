import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AuthContext } from "../../../../../context/AuthProvider";
import CreateProduct from "./CreateProduct";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  deleteProduct,
  getAllProducts,
} from "../../../../../services/apiServerviceProduct";
import { toast } from "react-toastify";
import UpdateProduct from "./UpdateProduct";
import HOST_IMG from "../../../../common/HostImg";
import { useLocation } from "react-router-dom";

const TableProduct = () => {
  const [loading, setLoading] = useState(true); // To handle loading state
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); // số lượng sản phẩm hiển thị trên mỗi trang
  const [error, setError] = useState(null); // To handle error state

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreateProduct = () => handleShow(true);

  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user && user?.products) {
      setProducts(user.products);
    }
    productGetAlls();
  }, [user && user.products, user?.role]);

  // Tính toán trang hiện tại và các sản phẩm để hiển thị
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const ellipsisStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3, // Hiển thị tối đa 3 dòng
    WebkitBoxOrient: "vertical",
    overflow: "hidden", // Thêm cuộn nếu nội dung vượt quá chiều cao
    whiteSpace: "normal",
    maxHeight: "90px", // Giới hạn chiều cao tối đa
    boxSizing: "border-box", // Đảm bảo padding và border không làm tăng kích thước tổng thể
  };

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [dataDelete, setDataDelete] = useState([]);
  const handleDeleteProduct = (idP, idU) => {
    setShowDelete(true);
    setDataDelete([idP, idU]);
  };

  const handleDelete = async () => {
    const res = await deleteProduct(dataDelete[0], dataDelete[1]);
    if (res.code !== 200) {
      return toast.error("Error when delete !");
    }
    toast.success("Delete successfully !");
    handleCloseDelete();
  };

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const [dataEdit, setDataEdit] = useState([]);

  const handleUpdateProduct = (idP, idU) => {
    setShowEdit(true);
    setDataEdit([idP, idU]);
  };

  //administrator -- fetch all product
  const productGetAlls = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      let res;
      const sort = ""; // Define or get the sort parameter if needed
      const categories = []; // Define or get the categories parameter if needed

      // Check role and call getAllProducts accordingly
      if (user?.role === "administrator" || user?.role === "seller") {
        res = await getAllProducts(sort, categories, user.role);
        console.log("res", res);
      } else {
        res = await getAllProducts(sort, categories);
      }

      // Adjust based on actual response object
      if (res.code === 200) {
        setProducts(res.data);
      } else if (res.status === 404) {
        setProducts([]); // No products found
      } else {
        console.error("Failed to fetch products:", res);
        setError("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="mt-3">
      {user.role === "seller" && (
        <button className="btn btn-dark" onClick={handleCreateProduct}>
          + Create Product
        </button>
      )}

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>NO</th>
            <th>ProductName</th>
            <th>ProductPrice</th>
            <th>ProductWeight</th>
            <th>ProductLongDesc</th>
            <th>ProductImage</th>
            <th>ProductCategory</th>
            <th>{user.role === "seller" && "ProductStock"}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => {
              // Xác định xem có hiển thị hàng sản phẩm này hay không
              const showRow =
                (user?.role === "administrator" && !product.status) ||
                (user?.role !== "administrator" && product.status);

              if (!showRow) return null;

              return (
                <tr key={product.ProductID + "" + index}>
                  <td>#{index + 1 + indexOfFirstProduct}</td>
                  <td>{product.ProductName}</td>
                  <td>$ {product.ProductPrice}</td>
                  <td>{product.ProductWeight}g</td>
                  <td style={ellipsisStyle}>{product.ProductLongDesc}</td>
                  <td>
                    <img
                      src={
                        product.ProductImage
                          ? `${HOST_IMG}/${product.ProductImage}`
                          : "no image"
                      }
                      alt="Product"
                      height={50}
                      width={50}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{product.CategoryName}</td>
                  <td>{user.role === "seller" && product.ProductStock}</td>
                  <td className="d-flex ">
                    {user && user.role === "seller" && (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleUpdateProduct(product.ProductID, user?.id)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDeleteProduct(product.ProductID, user?.id)
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {user && user.role === "administrator" && (
                      <>
                        <button className="btn btn-info btn-sm">Confirm</button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDeleteProduct(product.ProductID, user?.id)
                          }
                        >
                          No Confirm
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10">No products available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Stack spacing={2}>
        <Pagination
          className="d-flex justify-content-center justify-content-center mt-3"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Stack>

      <CreateProduct show={show} handleClose={handleClose} />
      <ModalDelete
        show={showDelete}
        handleCloseDelete={handleCloseDelete}
        dataDelete={dataDelete}
        handleDelete={handleDelete}
      />
      <UpdateProduct
        showEdit={showEdit}
        handleCloseEdit={handleCloseEdit}
        dataEdit={dataEdit}
      />
    </div>
  );
};

function ModalDelete({ show, handleCloseDelete, handleDelete }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseDelete}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal delete product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableProduct;
