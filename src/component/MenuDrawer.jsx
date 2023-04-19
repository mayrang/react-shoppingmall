import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
import { login, logout } from "../firebase/auth";
import { motion } from "framer-motion";

export default function MenuDrawer({ handleShowMenu }) {
  const user = useRecoilValue(authAtom);
  return (
    <div className="fixed h-full w-full mt-16 z-10 m-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-2/5 w-full bg-zinc-50 mx-auto flex flex-col items-center relative text-signiture"
      >
        <Link className="py-3 w-full text-center border-b  text-3xl" to="/products">
          Products
        </Link>
        {user && (
          <>
            <button className="text-3xl py-3 w-full text-center border-b">Cart</button>
            {user.isAdmin && (
              <Link to="/products/add" className="text-3xl py-3 w-full text-center border-b">
                Add Product
              </Link>
            )}
          </>
        )}
        {!user && (
          <button onClick={login} className="absolute bottom-4  text-2xl font-bold  ml-6">
            로그인
          </button>
        )}
        {user && (
          <button onClick={logout} className="absolute rounded text-2xl font-bold  bottom-4">
            로그아웃
          </button>
        )}
      </motion.div>
      <div onClick={handleShowMenu} className="bg-black opacity-25 h-3/5 w-full"></div>
    </div>
  );
}
