import React from "react";

export default function ProductCard({ title, price, imageUrl }) {
  return (
    <div className="w-full">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <span>{price}</span>
    </div>
  );
}
