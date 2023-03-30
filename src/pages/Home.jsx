import React from "react";
import { getLoginApi } from "./../firebase/auth";

export default function Home() {
  const clickLogin = () => {
    getLoginApi();
  };
  return (
    <div>
      <button onClick={clickLogin}></button>
    </div>
  );
}
