import React, { useRef } from "react";
import Carousel from "../component/Carousel";
import { imageUpload } from "../cloudinary/imageUpload";

export default function Home() {
  const testRef = useRef();
  const changeFile = async (e) => {
    await imageUpload(e.target.files);
  };
  return (
    <div>
      <Carousel />
      <div className="mx-auto w-screen max-w-[1140px] flex flex-col items-center justify-center">
        <div className="h-96">hi</div>
        <div className="h-96">hi</div>
        <div className="h-96">hi</div>
        <div className="h-96">hi</div>
        <div className="h-96">hi</div>
        <div className="h-96">hi</div>
        <div className="h-96">hi</div>
        <div className="h-96">hi</div>
      </div>
    </div>
  );
}
