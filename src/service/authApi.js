import firebase from "firebase";

export default {
  currentUser() {
    return firebase.auth().currentUser;
  },
  async signIn(email, password) {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value);
  },
  async register(email, password) {
    return await firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(email.value, password.value);
  },
};
