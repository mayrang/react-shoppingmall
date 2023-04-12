import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  return (
    <Slider
      className="w-full h-auto overflow-y-clip overflow-x-hidden"
      dots={true}
      infinite={true}
      nextArrow={false}
      pauseOnHover={true}
      fade={true}
      prevArrow={false}
      slidesToShow={1}
      slidesToScroll={1}
      speed={2000}
      autoplay={true}
      autoplaySpeed={7000}
    >
      <div className="w-full h-full relative ">
        <img src={"/images/puppy1.jpg"} alt="puppy1" className="object-cover  w-screen h-[500px]" />
        <h2 className="absolute top-1/3 left-20 font-bold text-2xl">테스트테스트테스트테스트</h2>
      </div>
      <div className="w-full h-full relative ">
        <img src={"/images/puppy2.jpg"} alt="puppy2" className="object-cover  w-screen h-[500px]" />
      </div>
      <div className="w-full h-full relative ">
        <img src={"/images/trip1.jpg"} alt="trip1" className="object-cover  w-screen h-[500px]" />
      </div>
      <div className="w-full h-full relative ">
        <img src={"/images/trip2.jpg"} alt="trip2" className="object-cover  w-screen h-[500px]" />
      </div>
    </Slider>
  );
}
