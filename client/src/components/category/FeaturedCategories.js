import React, { useEffect, useState } from "react";
import "../../assets/styles/components/category/__FeaturedCategories.scss";
import { getAllCategories } from "../../services/apiServerviceCategorie";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.code !== 200) {
        return toast.error("don't get data Categories ");
      }
      setCategories(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  let colors = [
    "#FFB6C1", // Light Pink
    "#FFDAB9", // Peach Puff
    "#E6E6FA", // Lavender
    "#FFFACD", // Lemon Chiffon
    "#F0FFF0", // Honeydew
    "#F0F8FF", // Alice Blue
    "#E0FFFF", // Light Cyan
    "#E6E6FA", // Lavender
    "#F5FFFA", // Mint Cream
    "#FFF5EE", // SeaShell
    "#FAFAD2", // Light Goldenrod Yellow
    "#D8BFD8", // Thistle
    "#FFE4E1", // Misty Rose
    "#F5F5DC", // Beige
    "#F5DEB3", // Wheat
    "#F0E68C", // Khaki
    "#E0E0E0", // Light Gray
    "#B0E0E6", // Powder Blue
    "#D3D3D3", // Light Grey
    "#FFF0F5", // Lavender Blush
    "#F8F8FF", // Ghost White
    "#FAEBD7", // Antique White
    "#FFF8DC", // Cornsilk
    "#F0FFF0", // Honeydew
    "#F5FFFA", // Mint Cream
  ];

  const randomColors = colors.map(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  });

  return (
    <div className="featured-categories">
      <div className="featured-categories__header deal-card__header">
        <div className="header-title">Featured Categories</div>
      </div>
      <div className="featured-categories__main row">
        {categories.slice(0, 12).map((items, index) => {
          const randomIndex = Math.floor(Math.random() * colors.length);

          const randomColor = colors[randomIndex];

          return (
            <div
              className="main-card col-6 col-sm-4 col-md-3 "
              key={items.CategoryID}
            >
              <div
                className="main-card__title"
                style={{ backgroundColor: randomColor }}
              >
                <Link
                  to={`/products?categories=${items.CategoryName}`}
                  className="title"
                  state={{ categoryName: items.CategoryName }} // Passing state
                >
                  {items.CategoryName}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCategories;
