import { atom } from "recoil";

export const authAtom = atom({
  key: "authAtom",
  dangerouslyAllowMutability: true,
  default: null,
});
