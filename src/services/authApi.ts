import firebase from "firebase";

export default {
  async signIn(email: string, password: string) {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  async register(email: string, password: string) {
    return await firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(email, password);
  },
};
