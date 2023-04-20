import React from "react";
import { processPrice } from "./../util/processPrice";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, title, price, imageUrl }) {
  const newPrice = processPrice(price);
  const navigate = useNavigate();
  const clickProduct = () => {
    navigate(`/product/detail/${id}`);
  };
  return (
    <div className="w-full cursor-pointer" onClick={clickProduct}>
      <img className="rounded-md" src={imageUrl} alt={title} />
      <h3 className="mt-2 font-medium text-base leading-5 line-clamp-2 overflow-ellipsis overflow-hidden">{title}</h3>
      <span className="font-bold text-sm ">{newPrice}원</span>
    </div>
  );
}
