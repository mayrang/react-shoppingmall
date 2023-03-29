import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default class Auth {
  constructor() {
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
  }

  signIn() {
    return this.#signInLogic();
  }

  async #signInLogic() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        return { token, user };
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return { errorCode, errorMessage };
        // ...
      });
  }
}
