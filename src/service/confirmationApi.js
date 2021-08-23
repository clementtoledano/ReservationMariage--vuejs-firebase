import firebase from "firebase";

export default {
  async create(lastname, firstname, adult, children, message, sunday) {
    return await firebase
      .firestore()
      .collection("confirmation")
      .add({
        userEmail: firebase.auth().currentUser.email,
        lastname: lastname.value,
        firstname: firstname.value,
        adult: adult.value,
        children: children.value,
        message: message.value,
        sunday: sunday.value,
      })
      .then(() => {
        alert("User successfully created!");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async update(id, lastname, firstname, adult, children, message, sunday) {
    await firebase
      .firestore()
      .collection("confirmation")
      .doc(id.value)
      .update({
        lastname: lastname.value,
        firstname: firstname.value,
        adult: adult.value,
        children: children.value,
        message: message.value,
        sunday: sunday.value,
      })
      .then(() => {
        alert("La confirmation a été mise à jour!");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
