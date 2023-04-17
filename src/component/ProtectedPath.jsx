import React from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
import { useNavigate } from "react-router-dom";

export default function ProtectedPath({ children, adminRequired }) {
  const navigate = useNavigate();
  const user = useRecoilValue(authAtom);
  if (adminRequired && user && user.isAdmin) {
    return <>{children}</>;
  } else {
    navigate("/", { replace: true });
    return null;
  }
}
