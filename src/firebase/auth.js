import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./init";
import { getDatabase, get, ref } from "firebase/database";

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      console.log("set");
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);

        return { ...user, isAdmin };
      }
      console.log(user);
      return user;
    });
}
