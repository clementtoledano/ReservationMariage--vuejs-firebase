import firebase from "firebase";
import { timestamp } from "../main";

export default {
  async getAllConfirmation() {
    const getCollection = await firebase
      .firestore()
      .collection("confirmation")
      .orderBy("createdAt", "desc");

    return await getCollection.get().then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  },
  async getConfirmationId(id, user, state, newUser) {
    await firebase
      .firestore()
      .collection("confirmation")
      .onSnapshot(function (snapshot) {
        return snapshot.docChanges().forEach(function (change) {
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
    return await firebase.firestore().collection("confirmation").add({
      userEmail: firebase.auth().currentUser.email,
      lastname: lastname,
      firstname: firstname,
      phone: phone,
      address: address,
      adult: adult,
      children: children,
      message: message,
      createdAt: timestamp(),
    });
  },
  async update(
    id,
    { lastname, firstname, phone, address, adult, children, message }
  ) {
    await firebase.firestore().collection("confirmation").doc(id.value).update({
      lastname: lastname,
      firstname: firstname,
      phone: phone,
      address: address,
      adult: adult,
      children: children,
      message: message,
      updateAt: timestamp(),
    });
  },
};
