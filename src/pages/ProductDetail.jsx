import React, { useState } from "react";

import { useParams } from "react-router-dom";

import DetailImage from "../component/DetailImage";
import { processPrice } from "../util/processPrice";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";

import ErrorMessage from "../component/ErrorMessage";
import useProduct from "../hook/useProduct";
import useCart from "../hook/useCart";

export default function ProductDetail() {
  const [selectOption, setSelectOption] = useState("#");
  const [errors, setErrors] = useState({});
  const { productId } = useParams();
  const [success, setSuccess] = useState();
  const user = useRecoilValue(authAtom);
  const {
    productQuery: { data: product },
  } = useProduct(productId);
  const { updateCartQuery } = useCart();
  const newPrice = processPrice(product?.price);

  const clickCart = () => {
    if (!user && !user.uid) {
      setErrors({ message: "로그인을 해주세용" });
      return;
    }
    if (selectOption === "#" && product.options && product.options?.tirm() !== "") {
      setErrors({ message: "옵션을 선택해주세요" });
      return;
    }
    updateCartQuery.mutate(
      { product: { ...product, option: selectOption || "" } },
      {
        onSuccess: () => {
          setSuccess("장바구니에 추가되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        },
      }
    );
  };
  return (
    <div className="mx-auto px-4 pt-24 md:pt-32 w-screen  max-w-[1140px] overflow-x-hidden flex flex-col items-center justify-center mb-12">
      {product && Object.keys(product).length > 0 && (
        <div className="w-full md:flex  md:justify-center">
          <div className="md:w-1/2">
            {product?.imageUrl && <DetailImage imageUrl={product.imageUrl} alt={product.title} />}
          </div>
          <div className="md:w-1/2 mt-6">
            <h2 className="font-bold text-2xl">{product.title}</h2>
            <div className="font-bold text-xl mt-5">₩{` ${newPrice}`}</div>
            <hr className="mt-4" />
            <div className="mt-4">{product.description}</div>
            <div className="mt-5 flex items-center">
              <span className="text-signiture line-clamp-1 w-10 mr-4 text-sm md:text-normal">옵션: </span>
              <select
                className="border-2 border-dashed border-signiture w-full "
                value={selectOption}
                onChange={(e) => setSelectOption(e.target.value)}
              >
                <option value="#">옵션을 선택해주세요</option>
                {product.options &&
                  product.options.trim() !== "" &&
                  product.options.split(",").map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
            <button onClick={clickCart} className="mt-10 w-full py-3 bg-signiture text-white">
              장바구니에 추가
            </button>
            {success && (
              <div className="mt-2 text-blue-500 flex items-center">
                <span className="font-semibold text-sm">{success}</span>
              </div>
            )}
            {errors && errors.message && <ErrorMessage message={errors.message} />}
          </div>
        </div>
      )}
    </div>
  );
}
