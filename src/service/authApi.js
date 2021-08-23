import firebase from "firebase";
import router from "../router";

export default {
  currentUser() {
    return firebase.auth().currentUser;
  },
  async signIn(email, password, errMsg) {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        router.push("/confirmation");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Email invalide";
            break;
          case "auth/user-not-found":
            errMsg.value = "Le compte n'éxiste pas avec cet email";
            break;
          case "auth/wrong-password":
            errMsg.value = "Password incorrect";
            break;
          default:
            errMsg.value = "Email ou password incorrect";
            break;
        }
      });
  },
  async register(email, password, errMsg) {
    firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        router.push("/confirmation");
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Email invalide";
            break;
          case "auth/weak-password":
            errMsg.value = "le password doit faire au moins 6 caractères";
            break;
          case "auth/email-already-in-use":
            errMsg.value = "l'email est déjà utilisé";
            break;
          default:
            errMsg.value = "Email ou password incorrect";
            break;
        }
      });
  },
};
