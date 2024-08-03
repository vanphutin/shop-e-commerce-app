import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AuthContext } from "../../../../../context/AuthProvider";
import CreateProduct from "./CreateProduct";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TableProduct = () => {
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); // số lượng sản phẩm hiển thị trên mỗi trang

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreateProduct = () => handleShow(true);

  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.products) {
      setProducts(user.products);
    }
  }, [user]);

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

  return (
    <div className="mt-3">
      <button className="btn btn-dark" onClick={handleCreateProduct}>
        + Create Product
      </button>

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
            <th>ProductStock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <tr key={product.ProductID}>
                <td>#{index + 1 + indexOfFirstProduct}</td>
                <td>{product.ProductName}</td>
                <td>$ {product.ProductPrice}</td>
                <td>{product.ProductWeight}g</td>
                <td style={ellipsisStyle}>{product.ProductLongDesc}</td>
                <td>
                  <img
                    src={
                      product.ProductImage
                        ? `data:image/png;base64,${product.ProductImage}`
                        : "no image"
                    }
                    alt="Product"
                    height={50}
                    width={50}
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{product.CategoryName}</td>
                <td>{product.ProductStock}</td>
                <td className="d-flex ">
                  {/* Add action buttons here */}
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No products available
              </td>
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
    </div>
  );
};

export default TableProduct;
