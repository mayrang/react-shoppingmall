import React from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
import { useNavigate } from "react-router-dom";

export default function ProtectedPath({ children, adminRequired }) {
  const navigate = useNavigate();
  const user = useRecoilValue(authAtom);
  if (!user || (adminRequired && !user.isAdmin)) {
    navigate("/", { replace: true });
    return null;
  } else {
    return <>{children}</>;
  }
}
