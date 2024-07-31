import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailProduct } from "../../../services/apiServerviceProduct";
import { toast } from "react-toastify";
import { CiShop } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import "../../../assets/styles/components/products/product-detail/__ProductDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchProductDetail(id);
  }, []);

  const fetchProductDetail = async (id) => {
    const res = await getDetailProduct(id);
    res.data === 200
      ? toast.error("Error when handle product !")
      : setProduct(res.data);
  };

  return (
    <div className="detail-page container-fluid">
      {product ? (
        <div className="detail-page-main row">
          <div className="detail-page-main main-address col-lg-4">
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
                <button type="button" class="btn btn-outline-info">
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
          <div className="detail-page-main main-info col-lg-4 ">
            <div className="main-info__category">
              {" "}
              {product.ProductCategoryID}
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
              <h6>$</h6> {product.ProductPrice}
            </div>
            <div className="main-info__size">
              <h6>Select Size</h6>
              <div className="main-info__size item">xs</div>
              <div className="main-info__size item">s</div>
              <div className="main-info__size item">m</div>
              <div className="main-info__size item">l</div>
              <div className="main-info__size item">xl</div>
              <div className="main-info__size item">xl</div>
              <div className="main-info__size item">xxl</div>
              <div className="main-info__size item">xxxl</div>
            </div>
            <div className="main-info__description">
              <h6 className="mb-2">Description</h6>{" "}
              <p>{product.ProductLongDesc}</p>
            </div>
          </div>
          <div className="detail-page-main main-order col-lg-4">
            <div className="main-order-body">
              <h5 className="main-order-title">Order Details</h5>
              <div className="main-order__quantily">
                <h6>Quantily</h6>
                <span className="main-order__quantily control decrease">-</span>
                <span className="main-order__quantily count">0</span>
                <span className="main-order__quantily control increase">+</span>
              </div>
              <div className="main-order__size">
                <h6>Size</h6>
                <span>M</span>
              </div>
              <div className="main-order__price">
                <h6>Price</h6>
                <span>$999,999</span>
              </div>
              <div className="main-order__vat">
                <h6>VAT</h6>
                <span>10%</span>
              </div>
              <div className="main-order__notes">
                <h6>Notes</h6>
                <textarea name="" id=""></textarea>
              </div>
              <div className="main-order__sub-total">
                <h6>Sub Total</h6> <span>$1.424.890</span>
              </div>
              <div class="d-grid gap-2 main-order__button">
                <buttob className="main-order__buy-now btn btn-primary">
                  Buy Now
                </buttob>
                <buttob className="main-order__add-cart btn btn-outline-primary">
                  Add to cart
                </buttob>
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
