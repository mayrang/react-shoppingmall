import React from "react";
import Carousel from "../component/Carousel";

export default function Home() {
  return (
    <div className="w-screen max-w-[1140px] flex items-center justify-center m-auto">
      <div className="w-screen m-auto h-auto">
        <Carousel />
      </div>
    </div>
  );
}
