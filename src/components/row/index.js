import React from "react";
import "./style.css";

export const Row = ({ item, index }) => {
  return (
    <div
      className="row"
      style={{
        backgroundColor: (index + 1) % 2 === 1 ? "rgb(64 64 64)" : null,
      }}
    >
      <div className="row__item"> {item.amount} </div>
      <div className="row__item"> {item.rate} </div>
    </div>
  );
};
