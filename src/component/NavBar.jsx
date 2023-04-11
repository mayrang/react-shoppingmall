import React from "react";
import { Link } from "react-router-dom";
import { login, logout } from "../firebase/auth";
import { FiShoppingBag } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { authAtom } from "./../recoil/auth";

export default function NavBar() {
  const user = useRecoilValue(authAtom);
  console.log(user);
  return (
    <div className="w-screen max-w-[1140px] flex items-center justify-center h-12 m-auto">
      <div className="w-full flex items-center justify-between h-full px-4 ">
        <Link to="/" className="text-2xl inline-flex items-center">
          <FiShoppingBag className="mr-2 text-3xl" />
          Style Avenue
        </Link>
        <div className="">
          {!user && (
            <button onClick={login} className="bg-blue-500 p-2 rounded text-sm">
              로그인
            </button>
          )}
          {user && (
            <button onClick={logout} className="bg-red-500 p-2 rounded text-sm">
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
