import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../firebase/product";

export default function ProductDetail() {
  const { productId } = useParams();
  const { data } = useQuery(["productDetail", productId], async () => getProduct(productId));
  console.log(productId, data);
  return <div>product Detail</div>;
}
