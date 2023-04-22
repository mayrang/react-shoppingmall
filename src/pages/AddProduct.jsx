import React, { useState } from "react";
import { imageUpload } from "../cloudinary/imageUpload";
import ErrorMessage from "../component/ErrorMessage";
import { useNavigate } from "react-router-dom";
import cls from "classnames";
import { processPrice } from "../util/processPrice";
import DetailImage from "../component/DetailImage";
import useProduct from "../hook/useProduct";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("#");
  const [restPrice, setRestPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { addProductQuery } = useProduct();
  const changeFile = async (e) => {
    const url = await imageUpload(e.target.files);
    setImageUrl(url);
  };
  const handleDelteImage = () => {
    setImageUrl(null);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
    setRestPrice(processPrice(e.target.value));
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    let copyErrors = {};
    if (title.trim() === "") {
      copyErrors = { ...copyErrors, title: "제품명은 비워놓을 수 없어요." };
      return;
    }
    if (price.trim() === "") {
      copyErrors = { ...copyErrors, price: "가격은 비워놓을 수 없어요." };
      return;
    } else if (isNaN(price)) {
      copyErrors = { ...copyErrors, price: "가격에는 숫자만 써주세요." };
      return;
    }
    if (category === "#") {
      copyErrors = { ...copyErrors, category: "카테고리 선택을 해주세요." };
      return;
    }
    if (options.trim() === "") {
      copyErrors = { ...copyErrors, options: "옵션은 비워놓을 수 없어요." };
      return;
    }

    const optionList = options.replace(/ /g, "");

    if (Object.keys(copyErrors).length > 0) {
      setErrors(copyErrors);
    }
    addProductQuery.mutate(
      {
        product: {
          title,
          price,
          category,
          description,
          imageUrl,
          options: optionList,
        },
      },
      {
        onSuccess: () => {
          alert("추가 되었습니다.");
          navigate("/", { replace: true });
        },
        onError: () => {
          alert("저장 과정에서의 에러");
          return;
        },
      }
    );
  };
  return (
    <form
      className="pt-24 xl:pt-36  flex flex-col justify-center w-screen max-w-[1140px] mx-auto px-2"
      onSubmit={submitProduct}
    >
      <label htmlFor="image">이미지</label>
      <div className={cls("border rounded-md p-2 w-full  mt-2", { "w-[400px] lg:w-[520px]": imageUrl })}>
        <div className="flex item-center justify-between">
          <input id="image" type="file" className="w-1/2" accept="image/*" onChange={changeFile} />
          {imageUrl && (
            <button className=" px-2 py-1 bg-red-500 rounded text-white" onClick={handleDelteImage}>
              삭제
            </button>
          )}
        </div>
        {imageUrl && (
          <div className="mt-3">
            <DetailImage imageUrl={imageUrl} alt={"제품 이미지"} />
          </div>
        )}
      </div>
      <div className="w-full mt-4">
        <label htmlFor="title">제품명</label>
        <input
          id="title"
          className="border rounded-md p-2 w-full mt-2 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제품명을 입력해주세요"
        />
        {errors && errors.title && <ErrorMessage message={errors.title} />}
      </div>
      <div className="w-full mt-4">
        <label htmlFor="price">가격</label>

        <input
          id="price"
          className="border rounded-md p-2 w-full mt-2 outline-none"
          value={price}
          onChange={handlePrice}
          placeholder="가격을 입력해주세요(숫자만 입력)"
        />
        <span className="text-sm font-light ">가격: {restPrice}원</span>
        {errors && errors.price && <ErrorMessage message={errors.price} />}
      </div>
      <div className="w-full mt-4">
        <label htmlFor="category"></label>

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md p-2 w-full mt-2 outline-none"
        >
          <option value="#">카테고리를 선택해주세요</option>
          <option value="top">상의</option>
          <option value="outer">아우터</option>
          <option value="bottom">하의</option>
          <option value="shoes">신발</option>
          <option value="bag">가방</option>
          <option value="accessory">악세서리</option>
          <option value="etc">기타</option>
        </select>
        {errors && errors.category && <ErrorMessage message={errors.category} />}
      </div>
      <div className="w-full mt-4">
        <label htmlFor="description">제품 설명</label>

        <textarea
          rows={3}
          id="discription"
          className="border rounded-md p-2 w-full mt-2 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="가격을 입력해주세요"
        />
      </div>
      <div className="w-full mt-4">
        <label htmlFor="options">옵션</label>

        <input
          id="options"
          className="border rounded-md p-2 w-full mt-2 outline-none"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          placeholder="옵션을 입력해주세요(쉼표로 구분)"
        />

        {errors && errors.options && <ErrorMessage message={errors.options} />}
      </div>
      <div className="flex items-center justify-end mt-3">
        <button type="submit" className="py-2 px-5 bg-blue-500 rounded border-none outline-none text-white">
          추가
        </button>
      </div>
    </form>
  );
}
