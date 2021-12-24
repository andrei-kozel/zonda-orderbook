import React from "react";

export const Row = ({ item, index }) => {
  return (
    <div
      className={`${
        (index + 1) % 2 === 1 ? "bg-neutral-700" : null
      } w-full flex place-content-around py-1 transition ease-in-out delay-100 hover:scale-105 hover:bg-neutral-500 duration-200`}
    >
      <div className="min-w-[100px]"> {item.amount} </div>
      <div className="min-w-[100px]"> {item.rate} </div>
    </div>
  );
};
