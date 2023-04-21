import React from "react";

import ProductList from "../component/ProductList";

export default function Products() {
  return (
    <div className="mx-auto px-4 pt-24 md:pt-32 w-screen  max-w-[1140px] overflow-x-hidden mb-8 flex flex-col items-center justify-center ">
      <ProductList />
    </div>
  );
}
