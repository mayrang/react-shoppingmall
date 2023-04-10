import React from "react";
import { Link } from "react-router-dom";
import { login } from "../firebase/auth";

export default function NavBar() {
  return (
    <div className=" flex items-center justify-between h-14 bg-zinc-100 px-4">
      <Link to="/"></Link>
      <div className="">
        <button onClick={login} className="bg-blue-500 p-3 rounded text-sm">
          로그인
        </button>
      </div>
    </div>
  );
}
