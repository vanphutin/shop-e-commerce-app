// helpers/shopHelper.js
const formatShopData = (shopProduct) => {
  const shopInfo = {
    idUser: shopProduct[0].UserID,
    username: shopProduct[0].UserName || "N/A",
    lastname: shopProduct[0].UserLastName || "N/A",
    firstname: shopProduct[0].UserFirstName || "N/A",
    usercity: shopProduct[0].UserCity || "N/A",
  };

  const uniqueCategories = Array.from(
    new Set(shopProduct.map((item) => item.CategoryName || "N/A"))
  );

  const products = shopProduct.map((item) => ({
    idProduct: item.ProductID,
    nameProduct: item.ProductName || "N/A",
    priceProduct: item.ProductPrice || 0,
    imageUrlProduct: `http://localhost:8081/${item.ProductImage}`,
    descriptionProduct: item.ProductLongDesc || "No description",
    stockProduct: item.ProductStock || 0,
  }));

  return {
    shop: shopInfo,
    categories: uniqueCategories,
    products: products,
  };
};

module.exports = {
  formatShopData,
};
