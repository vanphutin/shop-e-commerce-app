import React, { useEffect, useState } from "react";
import ProductCard from "../../product-card/ProductCard";
import "../../../../assets/styles/components/sugges/__SuggestToday.scss";
import { getAllProducts } from "../../../../services/apiServerviceProduct";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const location = useLocation();
  const [page, setPage] = useState(1); // State for pagination
  const { search } = location.state || {}; // Lấy state hoặc giá trị mặc định là {}
  const { productSearch } = location.state || {}; // Lấy state hoặc giá trị mặc định là {}

  const categoryName = location.state?.categoryName || ""; // Access the state here

  useEffect(() => {
    getProduct();
  }, [location.search, page]);

  const getProduct = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const params = new URLSearchParams(location.search);
      const sort = params.get("sort") || ""; // Get sort parameter
      const categoriesParam = params.get("categories"); // Get categories parameter
      let categories = categoriesParam ? categoriesParam.split(",") : []; // Split categories into array
      if (search) {
        categories.push(search);
      }

      const res = await getAllProducts(sort, categories, page);

      if (res.code === 200) {
        // Adjust based on actual response object
        setProducts(res.data);
      } else if (res.code === 404) {
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
  if (loading)
    return (
      <p style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh", // Bạn có thể điều chỉnh chiều cao theo nhu cầu
          }}
        >
          <CircularProgress />
        </Box>
      </p>
    ); // Loading state
  if (error) return <p>{error}</p>; // Error state
  const handleChange = (event, value) => {
    setPage(value); // Update page state on pagination change
  };

  return (
    <div className="product-items">
      <h3>
        Search results for keyword {search ? `" ${search} "` : ""}
        <i>{categoryName ? `" ${categoryName} "` : ""}</i>
        <i></i>
        <i>
          {categoryName
            ? ""
            : ` ${
                location.search.length > 0
                  ? `"${location.search.split("=").slice(1)} "`
                  : ""
              }  `}
        </i>
      </h3>
      <div className="row suggest-today">
        {productSearch ? (
          productSearch.map((items, index) => (
            <div
              className="main-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3"
              key={items.id} // Sử dụng items.id làm key
            >
              <ProductCard
                productCart={items} // Truyền items vào productCart
                mainclassName="row"
                imageclassName="col-12"
                detailclassName="col-12"
                showButton={true}
                Linkto="detail"
              />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              className="main-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3"
              key={product.id} // Sử dụng product.id làm key
            >
              <ProductCard
                productCart={product} // Truyền product vào productCart
                mainclassName="row"
                imageclassName="col-12"
                detailclassName="col-12"
                showButton={true}
                Linkto="detail"
              />
            </div>
          ))
        ) : (
          <p>
            No products found! (Consider using Redux to manage state if the
            reset option is used)
          </p>
        )}
      </div>

      {products.length > 0 && (
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(products.length)} // Adjust the count based on total products
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      )}
    </div>
  );
};

export default ProductItems;
