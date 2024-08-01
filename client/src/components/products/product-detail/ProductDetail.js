import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDetailProduct } from "../../../services/apiServerviceProduct";
import { toast } from "react-toastify";
import { CiShop } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import "../../../assets/styles/components/products/product-detail/__ProductDetail.scss";
import { AuthContext } from "../../../context/AuthProvider";
import { getDetailCategories } from "../../../services/apiServerviceCategorie";
import { postAddCart } from "../../../services/apiServerviceCart";

const ProductDetail = () => {
  const { user } = useContext(AuthContext);
  const nagigate = useNavigate();
  const SIZE_LIST = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];
  const TOKEN = localStorage.getItem("token");
  const VAT = 0.1;
  const [size, setSize] = useState("null");
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantily] = useState(1);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("null");

  //Call APIs
  useEffect(() => {
    fetchProductDetail(id);
    if (product?.ProductCategoryID) {
      fetchCategory(product.ProductCategoryID);
    }
  }, [product?.ProductCategoryID]);

  // API get detail product
  const fetchProductDetail = async (id) => {
    const res = await getDetailProduct(id);
    res.data === 200
      ? toast.error("Error when handle product !")
      : setProduct(res.data);
  };

  // API convert categoryID to categoryName
  const fetchCategory = async (ProductCategoryID) => {
    const res = await getDetailCategories(ProductCategoryID);
    if (res.code === 404) {
      return toast.error("error ");
    }
    setCategory(res.data);
  };
  //Count quantity
  const handleQuantily = (e) => {
    const action = e.target.getAttribute("name");
    if (action === "INCREMENT") {
      setQuantily((count) => count + 1);
    } else if (action === "DERCMENT") {
      quantity === 1 ? setQuantily(1) : setQuantily((count) => count - 1);
    }
  };

  //Set size
  const handleSetSize = (item, index) => {
    const element = document.querySelectorAll(".item");
    element.forEach((e) => e.classList.remove("active"));
    element[index].classList.add("active");
    setSize(item);
  };

  // Function to calculate total price
  const totalPrice = () => {
    return (product.ProductPrice * quantity).toFixed(3);
  };

  // Function to calculate subtotal including VAT
  const subTotal = () => {
    const total = parseFloat(totalPrice());
    return (total + total * VAT).toFixed(3);
  };

  //handle submit form
  const FetchAddToCart = async () => {
    try {
      if (user && TOKEN) {
        const res = await postAddCart(user?.id, id, quantity, size, notes);
        return toast.success("add product successfully");
      }
      toast.error("You are not logged in !");
      nagigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="detail-page container-fluid">
      {product ? (
        <div className="detail-page-main row">
          <div className="detail-page-main main-address  col-12 col-sm-12 col-lg-6 col-xl-4">
            <div className="main-address__image">
              <img
                src={`data:image/jpeg;base64,${product.ProductImage} `}
                alt={product.ProductName}
                className="image"
              />
            </div>
            <div className="main-address__addr">
              <div className="main-address__addr-username d-flex justify-content-between align-items-center">
                <span className="__icon">
                  <CiShop size="1.5rem" />
                  <Link to="#"> {product.UserName}</Link>
                </span>
                <button type="button" className="btn btn-outline-info">
                  Visit Store
                </button>
              </div>
              <div className="main-address__addr-usercity ">
                <span className="__icon">
                  <CiLocationOn size="1.5rem" />
                </span>
                <Link to="#">{product.userCity}</Link>
              </div>
            </div>
          </div>
          <div className="detail-page-main main-info  col-12 col-sm-12 col-lg-6 col-xl-4 ">
            <div className="main-info__category">
              {" "}
              {category || product.ProductCategoryID}
            </div>
            <div className="main-info__name">
              <h1>{product.ProductName}</h1>{" "}
            </div>
            <div className="main-info__stock-weight">
              <div className="__stock mb-1">
                <h6>Stock :</h6> {product.ProductStock}
              </div>
              <div className="__weight">
                <h6>Weight :</h6> {product.ProductWeight}
              </div>
            </div>

            <div className="main-info__price">
              <h6>$</h6>
              {product.ProductPrice} <span>,000</span>
            </div>
            <div className="main-info__size">
              <h6>Select Size</h6>
              <ul className="main-info__size-list">
                {SIZE_LIST.map((item, index) => (
                  <li
                    className="main-info__size item"
                    key={index}
                    onClick={(e) => handleSetSize(item, index)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="main-info__description">
              <h6 className="mb-2">Description</h6>{" "}
              <p>{product.ProductLongDesc}</p>
            </div>
          </div>
          <div className="detail-page-main main-order col-12 col-sm-12 col-lg-12 col-xl-4">
            <div className="main-order-body">
              <h5 className="main-order-title">Order Details</h5>
              <div className="main-order__quantily   d-flex justify-content-between align-items-center  ">
                <h6>Quantily</h6>
                <div className="main-order__quantily item-control">
                  <span
                    className="main-order__quantily control decrease"
                    name="DERCMENT"
                    datatype="44"
                    onClick={handleQuantily}
                  >
                    -
                  </span>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={quantity}
                    readOnly
                    className="main-order__quantily count"
                  />
                  <span
                    className="main-order__quantily control increase"
                    name="INCREMENT"
                    onClick={handleQuantily}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="main-order__size   d-flex justify-content-between align-items-center ">
                <h6>Size</h6>
                <span className="text-title">{size ? size : "_NaN"}</span>
              </div>
              <div className="main-order__price  d-flex justify-content-between align-items-center ">
                <h6>Price</h6>
                <span className="text-title">${totalPrice()}</span>
              </div>
              <div className="main-order__vat  d-flex justify-content-between align-items-center ">
                <h6>VAT</h6>
                <span className="text-title">10%</span>
              </div>
              <div className="main-order__notes">
                <h6>Notes</h6>
                <textarea
                  name=""
                  id=""
                  placeholder="Send to seller ..."
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
              <div className="main-order__sub-total d-flex justify-content-between align-items-center ">
                <h6>Sub Total</h6>{" "}
                <span className="text-title">${subTotal()}</span>
              </div>
              <div className="d-grid gap-2 main-order__button">
                <button className="main-order__buy-now btn btn-primary">
                  Buy Now
                </button>
                <button
                  className="main-order__add-cart btn btn-outline-primary"
                  onClick={FetchAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "NO DATA"
      )}
    </div>
  );
};

export default ProductDetail;
