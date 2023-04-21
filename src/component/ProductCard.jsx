import React from "react";
import { processPrice } from "./../util/processPrice";
import { useNavigate } from "react-router-dom";

const process_category = {
  top: "상의",
  bottom: "하의",
  outer: "아우터",
  shoes: "신발",
  bag: "가방",
  accessory: "악세서리",
  etc: "기타",
};

export default function ProductCard({ id, title, price, imageUrl, category }) {
  const newPrice = processPrice(price);
  const navigate = useNavigate();
  const clickProduct = () => {
    navigate(`/product/detail/${id}`);
  };
  return (
    <div className="w-full cursor-pointer" onClick={clickProduct}>
      <img className="rounded-md" src={imageUrl} alt={title} />
      <h3 className="mt-2 font-medium text-base leading-5 line-clamp-2 overflow-ellipsis overflow-hidden">{title}</h3>
      <span className="font-bold text-sm block">{newPrice}원</span>
      <span className="text-sm block">{process_category[category]}</span>
    </div>
  );
}
