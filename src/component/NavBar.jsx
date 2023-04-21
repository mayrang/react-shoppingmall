import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login, logout } from "../firebase/auth";
import { FiShoppingBag } from "react-icons/fi";
import { BiMenu, BiX } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { authAtom } from "./../recoil/auth";
import { BsCart3, BsPencilFill } from "react-icons/bs";
import MenuDrawer from "./MenuDrawer";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useRecoilValue(authAtom);
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <>
      <div className="fixed z-10 w-screen flex items-center justify-center h-16 mx-auto bg-zinc-50">
        <div className="w-full max-w-[1140px] flex items-center justify-between h-full px-4 mx-auto">
          <Link to="/" className="text-2xl inline-flex items-center">
            <FiShoppingBag className="mr-2 text-3xl text-signiture" />
            Style Avenue
          </Link>
          <div className="flex items-center md:hidden">
            {user && (
              <button className="mr-4 inline-flex items-center text-sm font-semibold">
                <img src={user.photoURL} alt="profile" className="rounded-full w-8 h-8 bg-cover mr-1" />
                {user.displayName}
              </button>
            )}

            <button className="text-3xl" onClick={handleShowMenu}>
              {showMenu ? <BiX /> : <BiMenu />}
            </button>
          </div>
          <div className=" items-center hidden md:flex">
            <Link to="/products">Products</Link>
            {user && (
              <>
                <Link to="/cart" className="text-2xl ml-3">
                  <BsCart3 />
                </Link>
                {user.isAdmin && (
                  <Link to="/products/add" className="text-xl ml-3">
                    <BsPencilFill />
                  </Link>
                )}

                <button className="ml-3 inline-flex items-center text-sm font-semibold">
                  <img src={user.photoURL} alt="profile" className="rounded-full w-8 h-8 bg-cover mr-2" />
                  {user.displayName}
                </button>
              </>
            )}
            {!user && (
              <button onClick={login} className="bg-blue-500 py-2 px-4 rounded text-sm text-white ml-6">
                로그인
              </button>
            )}
            {user && (
              <button onClick={logout} className="bg-red-500 p-2 rounded text-sm text-white ml-6">
                로그아웃
              </button>
            )}
          </div>
        </div>
      </div>
      {showMenu && <MenuDrawer handleShowMenu={handleShowMenu} />}
    </>
  );
}
