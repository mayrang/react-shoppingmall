import React from "react";
import Carousel from "../component/Carousel";
import ProductList from "../component/ProductList";

export default function Home() {
  return (
    <div className="overflow-x-hidden  mb-12">
      <Carousel />
      <div className="mx-auto px-4 w-screen max-w-[1140px] overflow-x-hidden flex flex-col items-center justify-center ">
        <ProductList />
      </div>
    </div>
  );
}
