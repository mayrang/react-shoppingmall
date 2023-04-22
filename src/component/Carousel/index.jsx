import React from "react";
import Slider from "react-slick";
import "./Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  return (
    <Slider
      className="w-screen overflow-x-hidden h-full mb-16 mx-auto "
      dots={true}
      infinite={true}
      nextArrow={false}
      dotsClass="dots-slick"
      pauseOnHover={true}
      fade={true}
      prevArrow={false}
      slidesToShow={1}
      track
      slidesToScroll={1}
      speed={2000}
      autoplay={true}
      autoplaySpeed={7000}
    >
      <div className="w-full h-full relative">
        <img src={"/images/puppy1.jpg"} alt="puppy1" className="object-cover w-full h-[400px] md:h-[500px]" />
      </div>
      <div className="w-full h-full relative">
        <img src={"/images/puppy2.jpg"} alt="puppy2" className="object-cover w-full  h-[400px] md:h-[500px]" />
      </div>
      <div className="w-full h-full relative">
        <img src={"/images/trip1.jpg"} alt="trip1" className="object-cover w-full h-[400px] md:h-[500px]" />
      </div>
      <div className="w-full h-full relative">
        <img src={"/images/trip2.jpg"} alt="trip2" className="object-cover w-full  h-[400px] md:h-[500px]" />
      </div>
    </Slider>
  );
}
