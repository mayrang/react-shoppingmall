import React from "react";

export default function AddProduct() {
  return (
    <div>
      <form className="pt-20 flex flex-col items-center w-screen max-w-[1140px] mx-auto">
        <input type="file" className="w-full " accept="image/*" />
      </form>
    </div>
  );
}
