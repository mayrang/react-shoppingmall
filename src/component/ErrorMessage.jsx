import React from "react";
import { BiMessageError } from "react-icons/bi";

export default function ErrorMessage({ message }) {
  return (
    <div className="mt-2 text-red-500 flex items-center">
      <BiMessageError className="inline-block mr-1" />
      <span className="font-semibold text-sm">{message}</span>
    </div>
  );
}
