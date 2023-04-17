import { atom, selector} from "recoil";

import {  ref,  get } from 'firebase/database';
import {  database } from "../firebase/init";
import { onAuthStateChanged } from "firebase/auth";


export const authAtom = atom({
    key: "authAtom",
    default: null
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
export const userSelector = selector({
  key: "userSelector",
  get: async ({get}) => {
    const auth = get(authAtom);
    if(auth){
      const updatedUser = auth ? await adminUser(auth) : null;
      return updatedUser
    }else{
      onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        return updatedUser;
      });
    }
  }
})
  

export async function adminUser(user) {
    return get(ref(database, 'admins')) //
      .then((snapshot) => {
        if (snapshot.exists()) {
          const admins = snapshot.val();
          const isAdmin = admins.includes(user.uid);
          return { ...user, isAdmin };
        }
        return user;
      });
  }
  