import React from "react";
import { useQuery } from "react-query";
import { getProducts } from "../firebase/product";
import ProductCard from "./ProductCard";
import useProduct from "../hook/useProduct";

export default function ProductList() {
  const {
    productsQuery: { data },
  } = useProduct();

  return (
    <div className="w-full">
      <h2 className="font-bold text-xl">Products</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 grid-row">
        {data &&
          data.length > 0 &&
          data.map((product) => (
            <ProductCard
              key={product.id}
              title={product?.title}
              price={product?.price}
              id={product.id}
              imageUrl={product?.imageUrl}
              category={product?.category}
            />
          ))}
      </div>
    </div>
  );
}
