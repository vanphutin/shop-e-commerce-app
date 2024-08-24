import React from "react";
import ReactTooltip from "react-tooltip";

const DescriptionWithTooltip = ({ description }) => {
  return (
    <div>
      <span data-tip data-for="tooltip">
        {description.length > 50
          ? description.slice(0, 50) + "..."
          : description}
      </span>
      <ReactTooltip id="tooltip" place="top" effect="solid">
        {description}
      </ReactTooltip>
    </div>
  );
};

export default DescriptionWithTooltip;
