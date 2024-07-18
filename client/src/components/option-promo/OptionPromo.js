import React from "react";
import promo_one from "../../assets/images/promo/promo_one.gif";
import promo_two from "../../assets/images/promo/promo_two.png";
import promo_three from "../../assets/images/promo/promo_three.png";
import promo_four from "../../assets/images/promo/promo_four.png";
import "../../assets/styles/components/OptionPromo/__OptionPromo.scss";

import laptop_banner from "../../assets/images/banner-promo/laptop.png";
import iphone_banner from "../../assets/images/banner-promo/tnip.png";

const OptionPromo = () => {
  const promo = [
    {
      id: 1,
      image: promo_one,
      title: "Change 2G to 4G Smartphone",
    },
    {
      id: 2,
      image: promo_two,
      title: "Watches on sale from 177k",
    },
    {
      id: 3,
      image: promo_three,
      title: "Delicious Laptop Deal Up to 35% off",
    },
    {
      id: 4,
      image: promo_four,
      title: "Discount Up To 50% ++",
    },
  ];
  return (
    <>
      <div className="option-promo">
        <ul className="option-promo__items row ">
          {promo && promo.length > 0
            ? promo.map((items, index) => (
                <li
                  className="option__item col-12 col-sm-6 col-md-6 col-lg-3  "
                  key={index}
                >
                  <div className="option__item-img">
                    <img src={items.image} alt={items.title} className="img" />
                  </div>
                  <span className="option__item-title">{items.title}</span>
                </li>
              ))
            : ""}
        </ul>
      </div>
      <ImagePromo />
    </>
  );
};

function ImagePromo() {
  return (
    <>
      <div className="promo-popular ">
        <div className="promo-popular__content">
          <div className="promo-popular__left">
            <div className="promo-popular__left-title">
              <div className="left-title__top">NEW ARRIVALS</div>
              <div className="left-title__bottom">
                <p className="left-title__bottom-name-product">IPHONE 15</p>
                <div className="left-title__bottom-capacity">26GB/6GB RAM</div>
              </div>
            </div>
          </div>
          <div className="promo-popular__right d-none d-md-block">
            <div className="promo-popular__right-img">
              <img src={iphone_banner} alt="" className="img" />
            </div>
          </div>
        </div>
        <div className="promo-popular__content">
          <div className="promo-popular__left">
            <div className="promo-popular__left-title">
              <div className="left-title__top">SALL 30% OFF</div>
              <div className="left-title__bottom">
                <p className="left-title__bottom-name-product">COMPUTER &</p>
                <div className="left-title__bottom-capacity">LAPTOP</div>
              </div>
            </div>
          </div>
          <div className="promo-popular__right d-none d-md-block">
            <div className="promo-popular__right-img-laptop">
              <img src={laptop_banner} alt="" className="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OptionPromo;
