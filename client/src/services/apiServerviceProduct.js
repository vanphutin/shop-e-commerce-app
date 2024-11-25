import axios from "../utils/AxiosCustom";

const getAllProducts = (sort, categories, role) => {
  let url = "/product?";
  if (sort) {
    url += `sort=${sort}&`;
  }

  if (categories && categories.length > 0) {
    url += `categories=${categories.join(",")}&`;
  }

  // Remove trailing '&' if necessary
  url = url.endsWith("&") ? url.slice(0, -1) : url;

  // Add role to the request headers
  return axios.get(url, { headers: { role: role } });
};

const postCreateProduct = async (
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductLongDesc,
  ProductCategoryID,
  ProductStock,
  ProductImage,
  id
) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (
      !ProductName ||
      !ProductPrice ||
      !ProductWeight ||
      !ProductLongDesc ||
      !ProductCategoryID ||
      !ProductStock ||
      !ProductImage ||
      !id
    ) {
      throw new Error("Missing required fields");
    }

    const formData = new FormData();
    formData.append("ProductName", ProductName);
    formData.append("ProductPrice", ProductPrice);
    formData.append("ProductWeight", ProductWeight);
    formData.append("ProductLongDesc", ProductLongDesc);
    formData.append("ProductCategoryID", ProductCategoryID);
    formData.append("ProductStock", ProductStock);
    formData.append("ProductImage", ProductImage);
    formData.append("UserID", id);

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    const response = await axios.post("/product/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Kiểm tra phản hồi
    // if (response.status === 201) {
    //   console.log("Product created successfully", response.data);
    // } else {
    //   console.warn("Unexpected response:", response.status, response.data);
    // }

    return response; // Trả về đối tượng Axios response
  } catch (error) {
    if (error.response) {
      console.error(
        `Error posting product (HTTP ${error.response.status}):`,
        error.response.data
      );
    } else {
      console.error("Error posting product:", error.message);
    }
    throw error; // Ném lỗi để xử lý tiếp
  }
};

const getDetailProduct = (id) => {
  return axios.get(`product/detail/${id}`);
};
const deleteProduct = (ProductID, UserID) => {
  return axios.patch(`product/delete/${ProductID}`, { UserID });
};

const updateProduct = (
  ProductID,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductLongDesc,
  ProductStock,
  UserID
) => {
  return axios.patch(`product/update/${ProductID}`, {
    ProductName,
    ProductPrice,
    ProductWeight,
    ProductLongDesc,
    ProductStock,
    UserID,
  });
};

const getSearchProduct = (keyword) => {
  let url = "/product/search?";

  if (keyword) {
    url += `keyword=${keyword}`;
  }
  return axios.get(url);
};

export { getAllProducts };
export { postCreateProduct };
export { getDetailProduct };
export { deleteProduct };
export { updateProduct };
export { getSearchProduct };
