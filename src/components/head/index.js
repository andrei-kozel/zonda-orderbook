import React from "react";
import "./style.css";

export const Head = ({ currencyArray, title }) => {
  return (
    <div className="head">
      <div className="head__title">
        <span colSpan="2">{title}</span>
      </div>
      <div className="head__currency">
        <span>Amount ({currencyArray[0]})</span>
        <span>Price ({currencyArray[1]})</span>
      </div>
    </div>
  );
};
