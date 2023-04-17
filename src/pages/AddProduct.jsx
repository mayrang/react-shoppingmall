import React, { useState } from "react";
import { imageUpload } from "../cloudinary/imageUpload";

export default function AddProduct() {
  const [imageUrl, setImageUrl] = useState(null);
  const changeFile = async (e) => {
    const url = await imageUpload(e.target.files);
    setImageUrl(url);
  };
  const handleDelteImage = () => {
    setImageUrl(null);
  };
  return (
    <form className="pt-52 flex flex-col items-center w-screen max-w-[1140px] mx-auto">
      <div className="w-full">
        <label htmlFor="image">이미지</label>
        <div className="border rounded-md p-2 w-full">
          <div className="flex item-center justify-between">
            <input type="file" className="w-1/2" accept="image/*" onChange={changeFile} />
            {imageUrl && (
              <button className=" px-2 py-1 bg-red-500 rounded text-white" onClick={handleDelteImage}>
                삭제
              </button>
            )}
          </div>
          {imageUrl && <img src={imageUrl} className="mt-3" alt="쇼핑 이미지" />}
        </div>
      </div>
    </form>
  );
}
