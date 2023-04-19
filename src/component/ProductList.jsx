import React from "react";
import { useQuery } from "react-query";
import { getProducts } from "../firebase/product";

export default function ProductList() {
  const { data, islading, error } = useQuery(["products"], async () => getProducts());

  return (
    <div className="w-full">
      <h2 className="font-bold text-xl">Products</h2>
      <div className="grid grid-cols-4">
        {data && data.length > 0 && data.map((product) => <div key={product.id}>{product.title}</div>)}
      </div>
    </div>
  );
}
