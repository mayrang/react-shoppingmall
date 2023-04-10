import React from "react";
import { login } from "./../firebase/auth";

export default function Home() {
  const clickLogin = () => {
    login();
  };
  return (
    <div>
      <button onClick={clickLogin}>로그인</button>
    </div>
  );
}
