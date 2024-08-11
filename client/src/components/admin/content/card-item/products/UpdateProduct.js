import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAllCategories } from "../../../../../services/apiServerviceCategorie";
import { toast } from "react-toastify";
import CreateCategoryForm from "./CreateCategoryForm";
import {
  getDetailProduct,
  postCreateProduct,
  updateProduct,
} from "../../../../../services/apiServerviceProduct";
import { AuthContext } from "../../../../../context/AuthProvider";

const UpdateProduct = ({ showEdit, handleCloseEdit, dataEdit }) => {
  const { user } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [ProductCategoryID, setProductCategoryID] = useState("");
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState(0);
  const [ProductWeight, setProductWeight] = useState(0);
  const [ProductLongDesc, setProductLongDesc] = useState("");
  const [ProductStock, setProductStock] = useState(0);
  const [ProductImage, setProductImage] = useState(null);

  const [file, setFile] = useState();

  useEffect(() => {
    fetchCategories();
    if (dataEdit && dataEdit.length > 0) {
      handleViewProduct(dataEdit[0]);
    }
    preViewImg(ProductImage);
  }, [dataEdit[0], ProductImage, user?.products]);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.code === 200) {
        setCategories(res.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    }
  };

  const handleCategoryCreated = () => {
    fetchCategories();
  };
  const handleViewProduct = async () => {
    if (dataEdit && dataEdit.length > 0) {
      const res = await getDetailProduct(dataEdit[0]);
      if (res.code === 200) {
        setProductName(res.data.ProductName);
        setProductImage(res.data.ProductImage);
        setProductCategoryID(res.data.ProductCategoryID);
        setProductStock(res.data.ProductStock);
        setProductWeight(res.data.ProductWeight);
        setProductPrice(res.data.ProductPrice);
        setProductLongDesc(res.data.ProductLongDesc);
      }
    }
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    const uploadFileAvatar = e.target.files[0];
    if (uploadFileAvatar) {
      setProductImage(uploadFileAvatar);
    }
  };

  const preViewImg = (ProductImage) => {
    setFile(ProductImage);
  };
  const handleCategoryChange = (event) => {
    setProductCategoryID(event.target.value);
  };

  const handleSubmitUpdateProduct = async (e) => {
    e.preventDefault();
    const res = await updateProduct(
      dataEdit[0],
      ProductName,
      ProductPrice,
      ProductWeight,
      ProductLongDesc,
      ProductStock,
      user?.id
    );
    if (res.code !== 200) {
      return toast.error("Error server !");
    }
    handleCloseEdit(false);
    return toast.success("Update product successfully");
  };
  return (
    <Modal show={showEdit} onHide={handleCloseEdit} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Modal Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="h-100 ">
          <div className="container  h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4">
                  <div className=" ">
                    <div className="">
                      <form onSubmit={handleSubmitUpdateProduct}>
                        <div className="card-body  text-black">
                          <div className="row">
                            <CreateCategoryForm
                              showBtn={false}
                              onCategoryCreated={handleCategoryCreated}
                              CategoryNameID={`CategoryID : ${ProductCategoryID}`}
                              disabled={true}
                            />

                            <div className="col-md-6 mb-4">
                              <div data-mdb-input-init className="form-outline">
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1m"
                                >
                                  Name product
                                </label>
                                <input
                                  type="text"
                                  id="form3Example1m"
                                  className="form-control form-control-lg"
                                  placeholder="Jond"
                                  name="ProductName"
                                  value={ProductName}
                                  onChange={(e) =>
                                    setProductName(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div data-mdb-input-init className="form-outline">
                                {" "}
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1n"
                                >
                                  Price
                                </label>
                                <input
                                  type="text"
                                  id="form3Example1n"
                                  className="form-control form-control-lg"
                                  placeholder="EX : 155.000.00"
                                  value={ProductPrice}
                                  name="ProductPrice"
                                  onChange={(e) =>
                                    setProductPrice(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div data-mdb-input-init className="form-outline">
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1m"
                                >
                                  Weight
                                </label>
                                <input
                                  type="text"
                                  id="form3Example1m"
                                  className="form-control form-control-lg"
                                  placeholder="EX : 3.5"
                                  name="ProductWeight"
                                  value={ProductWeight}
                                  onChange={(e) =>
                                    setProductWeight(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div data-mdb-input-init className="form-outline">
                                {" "}
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1n"
                                >
                                  Stock
                                </label>
                                <input
                                  type="text"
                                  id="form3Example1n"
                                  className="form-control form-control-lg"
                                  placeholder="EX : 1000"
                                  name="ProductStock"
                                  value={ProductStock}
                                  onChange={(e) =>
                                    setProductStock(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label
                              className="form-label d-block"
                              htmlFor="form3Example99"
                            >
                              Descript
                            </label>
                            <textarea
                              style={{
                                width: "-webkit-fill-available",
                                minHeight: "200px",
                              }}
                              name="ProductLongDesc"
                              value={ProductLongDesc}
                              onChange={(e) =>
                                setProductLongDesc(e.target.value)
                              }
                            />
                          </div>

                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label
                              className="form-label"
                              htmlFor="form3Example90"
                            >
                              ProductImage
                            </label>
                            <span
                              style={{
                                border: "1px solid #ffc107",
                                backgroundColor: "red",
                                color: "#Fff",
                                marginLeft: "10px",
                              }}
                            >
                              Cannot edit image due to sensitivity!
                            </span>
                            <img
                              src={`data:image/png;base64,${file}`}
                              alt=""
                              style={{ width: "200px", display: "block" }}
                            />
                          </div>

                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseEdit}
                            >
                              Close
                            </Button>
                            <Button variant="primary" type="submit">
                              Confirm
                            </Button>
                          </Modal.Footer>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProduct;
