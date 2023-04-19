import React, { useRef } from "react";
import Carousel from "../component/Carousel";
import { imageUpload } from "../cloudinary/imageUpload";

export default function Home() {
  const testRef = useRef();
  const changeFile = async (e) => {
    await imageUpload(e.target.files);
  };
  return (
    <>
      <Carousel />
      <div className="mx-auto w-screen max-w-[1140px] overflow-x-hidden flex flex-col items-center justify-center"></div>
    </>
  );
}
