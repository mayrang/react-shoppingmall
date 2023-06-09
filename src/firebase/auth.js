import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from "firebase/auth";
import { app } from "./init";
import { getDatabase, get, ref, query, equalTo, orderByChild } from "firebase/database";

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithRedirect(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}
export async function adminUser(user) {
  return get(query(ref(database, "admins"), orderByChild("uid"), equalTo(user.uid))) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        //const isAdmin = admins.includes(user.uid);

        return { ...user, isAdmin: true };
      }

      return { ...user, isAdmin: false };
    });
}
