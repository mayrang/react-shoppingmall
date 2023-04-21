import React from "react";
import { useQuery } from "react-query";
import { getCarts } from "../firebase/cart";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
import { processPrice } from "../util/processPrice";
import { BsTrashFill } from "react-icons/bs";

export default function Cart() {
  const user = useRecoilValue(authAtom);
  const { data: cartList } = useQuery(["cartList"], async () => getCarts(user?.uid));
  console.log("cartList", cartList);
  return (
    <div className="mx-auto px-4 pt-24 md:pt-32 w-screen  max-w-[1140px] overflow-x-hidden flex flex-col items-center justify-center">
      <h2 className="w-full text-center py-4 border-b text-lg">내 장바구니</h2>
      {cartList && cartList.length > 0 ? (
        <ul className="w-full border-b">
          {cartList.map((item) => (
            <li key={item.id} className="flex items-center justify-between w-full py-4">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.title} width={150} className="h-[200px] cover rounded" />
                <div className="flex flex-col items-center justify-center ml-4">
                  <span>{item.title}</span>
                  <span className="text-signiture">{item.option}</span>
                  <span>₩{` ${processPrice(item.price)}`}</span>
                </div>
              </div>
              <div className="flex items-center">
                <button className="px-2 text-sm font-semibold border-2 mr-2">-</button>
                <span className="text-lg">{item.count}</span>
                <button className="px-2 text-sm font-semibold border-2 ml-2">+</button>
                <button className="font-semibold text-xl ml-4">
                  <BsTrashFill />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-40 w-full">
          <span>텅 비었습니다.</span>
        </div>
      )}
    </div>
  );
}
