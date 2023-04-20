import React from "react";

export default function DetailImage({ imageUrl, alt }) {
  return <img src={imageUrl} alt={alt} className="w-[380px] h-[450px] lg:w-[500px] lg:h-[600px]" />;
}
