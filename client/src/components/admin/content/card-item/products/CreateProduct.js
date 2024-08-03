import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAllCategories } from "../../../../../services/apiServerviceCategorie";
import { toast } from "react-toastify";
import CreateCategoryForm from "./CreateCategoryForm";
import { postCreateProduct } from "../../../../../services/apiServerviceProduct";
import { AuthContext } from "../../../../../context/AuthProvider";

const CreateProduct = ({ show, handleClose }) => {
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
  }, []);

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

  const handleSubmitCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await postCreateProduct(
        ProductName,
        ProductPrice,
        ProductWeight,
        ProductLongDesc,
        ProductCategoryID,
        ProductStock,
        ProductImage,
        user?.id
      );
      // console.log("res", res);
      if (res.code === 201) {
        toast.success("Product created successfully!");
        handleClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    const uploadFileAvatar = e.target.files[0];
    if (uploadFileAvatar) {
      setProductImage(uploadFileAvatar);
    }
  };
  const handleCategoryChange = (event) => {
    setProductCategoryID(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Modal confirm ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="h-100 ">
          <div className="container  h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4">
                  <div className=" ">
                    <div className="">
                      <form onSubmit={handleSubmitCreateProduct}>
                        <div className="card-body  text-black">
                          <div className="row">
                            <CreateCategoryForm
                              onCategoryCreated={handleCategoryCreated}
                            />
                            <div
                              data-mdb-input-init
                              className="form-outline mb-4"
                            >
                              <label
                                className="form-label"
                                htmlFor="form3Example97"
                                style={{ marginRight: "10px" }}
                              >
                                Category
                              </label>

                              <select
                                name="ProductCategoryID"
                                value={ProductCategoryID}
                                onChange={handleCategoryChange} // Added onChange handler
                              >
                                {categories.map((category) => (
                                  <option
                                    key={category.CategoryID}
                                    value={category.CategoryID}
                                  >
                                    {category.CategoryName}
                                  </option>
                                ))}
                              </select>
                            </div>

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
                              style={{ width: "-webkit-fill-available" }}
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
                            <input
                              type="file"
                              id="form3Example90"
                              className="form-control form-control-lg"
                              name="ProductImage"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <img src={file} alt="" style={{ width: "200px" }} />
                          </div>

                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
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

export default CreateProduct;
