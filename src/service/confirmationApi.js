import firebase from "firebase";
import { timestamp } from "../main";

export default {
  async getConfirmationId(id, user, state, newUser) {
    firebase
      .firestore()
      .collection("confirmation")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          const data = change.doc.data();
          if (user.email === data.userEmail) {
            state.lastname = data.lastname;
            state.firstname = data.firstname;
            state.phone = data.phone;
            state.address = data.address;
            state.adult = data.adult;
            state.children = data.children;
            state.message = data.message;
            newUser.value = false;
            id.value = change.doc.id;
          }
        });
      });
  },
  async create({
    lastname,
    firstname,
    phone,
    address,
    adult,
    children,
    message,
  }) {
    return await firebase
      .firestore()
      .collection("confirmation")
      .add({
        userEmail: firebase.auth().currentUser.email,
        lastname: lastname,
        firstname: firstname,
        phone: phone,
        address: address,
        adult: adult,
        children: children,
        message: message,
        createdAt: timestamp(),
      })
      .then(() => {
        alert("Vous avez confirmé votre presence, merci !");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async update(
    id,
    { lastname, firstname, phone, address, adult, children, message }
  ) {
    await firebase
      .firestore()
      .collection("confirmation")
      .doc(id.value)
      .update({
        lastname: lastname,
        firstname: firstname,
        phone: phone,
        address: address,
        adult: adult,
        children: children,
        message: message,
        updateAt: timestamp(),
      })
      .then(() => {
        alert("Votre confirmation a été mise à jour!");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
