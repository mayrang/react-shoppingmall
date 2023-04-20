import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../firebase/product";
import DetailImage from "../component/DetailImage";

export default function ProductDetail() {
  const { productId } = useParams();
  const { data: product } = useQuery(["productDetail", productId], async () => getProduct(productId));
  console.log(product);
  return (
    <div className="mx-auto px-4 w-screen max-w-[1140px] overflow-x-hidden flex flex-col items-center justify-center">
      {product && Object.keys(product).length > 0 && (
        <div className="w-full flex items-center">
          <div className="w-1/2">
            {product?.imageUrl && <DetailImage imageUrl={product.imageUrl} alt={product.title} />}
          </div>
        </div>
      )}
    </div>
  );
}
