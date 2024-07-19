import React, { useEffect, useState } from "react";
import classNames from "classnames";

const images = [
  {
    url: "https://genk.mediacdn.vn/2018/8/5/386146239667656201610143863448190854365184n-1533442997389894652550.jpg",
    alt: "naruto",
  },
  {
    url: "https://thethaovanhoa.mediacdn.vn/thumb_w/1200/372676912336973824/2023/4/1/photo-1680319565999-16803195672551459863501-1680346456184-1680346456792861218842-453-0-1577-2000-crop-16803465398671116476352.jpeg",
    alt: "eren",
  },
  {
    url: "https://vcdn1-sohoa.vnecdn.net/2021/07/14/Reno6-Z-3600x1600-CMYK-4538-1626251823.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=Muf91nxcv7QFVkWfKro9qw",
    alt: "goku",
  },
];
export default function Carousel() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };
  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Tự động chuyển slide sau mỗi 3 giây

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  return (
    <div
      className="Carousel border  rounded my-4"
      style={{
        boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      }}
    >
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators ">
          {Array.from(Array(images.length).keys()).map((buttonIndex) => (
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={buttonIndex}
              className={classNames({
                active: buttonIndex === index,
              })}
              key={buttonIndex}
              aria-current="true"
              aria-label={`Slide ${buttonIndex + 1}`}
              onClick={() => setIndex(buttonIndex)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {images.map(({ url, alt }, imageIndex) => (
            <div
              className={classNames("carousel-item", {
                active: imageIndex === index,
              })}
              key={imageIndex}
            >
              <img
                src={url}
                className="d-block w-100"
                alt={alt}
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev "
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
          onClick={handlePrev}
        >
          <span
            className="carousel-control-prev-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
          onClick={handleNext}
        >
          <span
            className="carousel-control-next-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
