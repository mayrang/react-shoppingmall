import React from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";

export default function Products() {
  const user = useRecoilValue(authAtom);
  console.log(user);
  return <div></div>;
}
