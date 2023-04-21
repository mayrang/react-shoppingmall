import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addOrUpdateCart, getCarts, removeCart } from "../firebase/cart";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
import { processPrice } from "../util/processPrice";
import { BsTrashFill, BsFillPlusCircleFill } from "react-icons/bs";
import getTotalPrice from "../util/getTotalPrice";
import { FaEquals } from "react-icons/fa";

export default function Cart() {
  const user = useRecoilValue(authAtom);
  const queryClient = useQueryClient();
  const { data: cartList, isLoading, isSuccess } = useQuery(["cartList"], async () => getCarts(user?.uid));
  const totalPrice = getTotalPrice(cartList);
  const { mutate: updateMutate } = useMutation(
    ({ uid, product }) => {
      return addOrUpdateCart(uid, product);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cartList"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { mutate: removeMutate } = useMutation(
    ({ uid, productId }) => {
      return removeCart(uid, productId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cartList"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  console.log("cartList", cartList);
  console.log("isloading", isLoading, isSuccess);
  const handleUpdateCount = (item, sign) => {
    if (!user && !user?.uid) {
      return;
    }
    if (sign === "+") {
      updateMutate({ uid: user.uid, product: { ...item, count: item.count + 1 } });
      return;
    } else if (sign === "-") {
      if (item.count === 1) {
        removeMutate({ uid: user.uid, productId: item.id });
      } else {
        updateMutate({ uid: user.uid, product: { ...item, count: item.count - 1 } });
      }
    } else {
      return;
    }
  };
  const handleRemove = (productId) => {
    if (!user && !user?.uid) {
      return;
    }
    removeMutate({ uid: user.uid, productId });
    return;
  };
  if (isLoading && !isSuccess) {
    <div className="mx-auto px-4 pt-24 md:pt-32 w-screen  max-w-[1140px] overflow-x-hidden flex flex-col items-center justify-center">
      loading...
    </div>;
  } else {
    return (
      <div className="mx-auto mb-8 px-4 pt-24 md:pt-32 w-screen  max-w-[1140px] overflow-x-hidden flex flex-col items-center justify-center">
        <h2 className="w-full text-center py-4 border-b text-lg">내 장바구니</h2>
        {cartList && cartList.length > 0 ? (
          <ul className="w-full border-b">
            {cartList.map((item) => (
              <li key={item.id} className="flex items-center justify-between w-full py-4">
                <div className="flex  items-center">
                  <img src={item.imageUrl} alt={item.title} width={150} className="h-[200px] cover rounded" />
                  <div className="flex flex-col  justify-center ml-4">
                    <span>{item.title}</span>
                    <span className="text-signiture">{item.option === "#" ? "" : item.option}</span>
                    <span>₩{` ${processPrice(item.price)}`}</span>
                  </div>
                </div>
                <div className="flex  items-center">
                  <button
                    className="px-2 text-sm font-semibold border-2 mr-2"
                    onClick={() => handleUpdateCount(item, "-")}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.count}</span>
                  <button
                    className="px-2 text-sm font-semibold border-2 ml-2"
                    onClick={() => handleUpdateCount(item, "+")}
                  >
                    +
                  </button>
                  <button onClick={() => handleRemove(item.id)} className="font-semibold text-xl ml-4">
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
        <div className="w-full px-10 py-5 flex max-md:flex-col justify-between items-center">
          <div className="w-auto p-10 text-lg  flex flex-col items-center justify-center">
            <span>상품총액</span>
            <span className="text-signiture">₩{` ${processPrice(totalPrice)}`}</span>
          </div>
          <div className=" text-lg">
            <BsFillPlusCircleFill />
          </div>
          <div className="w-auto p-10 text-lg  flex flex-col items-center justify-center">
            <span>배송비</span>
            <span className="text-signiture">₩{` 3,000`}</span>
          </div>
          <div className="text-lg">
            <FaEquals />
          </div>
          <div className="w-auto p-10 text-lg  flex flex-col items-center justify-center">
            <span>총 가격</span>
            <span className="text-signiture">₩{` ${processPrice(totalPrice + 3000)}`}</span>
          </div>
        </div>
        <button onClick={() => alert("망했어요!!")} className="w-full py-2 bg-signiture text-white">
          구매하기
        </button>
      </div>
    );
  }
}
