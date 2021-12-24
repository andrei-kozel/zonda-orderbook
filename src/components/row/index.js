import React from "react";

export const Row = ({ item, index }) => {
  return (
    <div
      className="w-full flex place-content-around py-1"
      style={{
        backgroundColor: (index + 1) % 2 === 1 ? "rgb(64 64 64)" : null,
      }}
    >
      <div className="min-w-[100px]"> {item.amount} </div>
      <div className="min-w-[100px]"> {item.rate} </div>
    </div>
  );
};
