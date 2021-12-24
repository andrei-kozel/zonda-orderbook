import React from "react";

export const Head = ({ currencyArray, title }) => {
  return (
    <div className="flex flex-col font-bold">
      <div className="flex justify-center text-lg py-1">
        <span colSpan="2">{title}</span>
      </div>
      <div className="flex place-content-around text-lg py-1">
        <span className="py-1">Amount ({currencyArray[0]})</span>
        <span className="py-1">Price ({currencyArray[1]})</span>
      </div>
    </div>
  );
};
