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
      <div className="w-full max-w-[1140px] flex flex-col items-center">
        <button className="p-2" onClick={() => testRef.current.click()}>
          이미지 테스트
        </button>
        <input type="file" ref={testRef} onChange={changeFile} accept="image/*" />
      </div>
    </div>
  );
}
