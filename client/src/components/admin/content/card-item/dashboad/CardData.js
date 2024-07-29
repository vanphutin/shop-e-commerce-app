import React from "react";
import "../../../../../assets/styles/components/admin/content/__CardData.scss";

const CardData = ({ data }) => {
  console.log("data", data);
  return (
    <div className="card-dashboad ">
      <div className="card-dashboad__main boder row">
        <div className="card-dashboad__main-icon col-3">
          <div className="icon">{data?.icon || ""}</div>
        </div>
        <div className="card-dashboad__main-data  col-9 ">
          <p className="main-data__title">{data?.title || ""}</p>
          <span className="main-data__parameter">{data?.parameter || ""}</span>
        </div>
      </div>
    </div>
  );
};

export default CardData;
