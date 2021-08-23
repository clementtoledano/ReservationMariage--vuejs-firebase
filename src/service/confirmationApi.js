import firebase from "firebase";

export default {
  async getConfirmation(
    id,
    user,
    lastname,
    firstname,
    adult,
    children,
    message,
    sunday,
    newUser
  ) {
    firebase
      .firestore()
      .collection("confirmation")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          const data = change.doc.data();

          if (user.email === data.userEmail) {
            lastname.value = data.lastname;
            firstname.value = data.firstname;
            adult.value = data.adult;
            children.value = data.children;
            message.value = data.message;
            sunday.value = data.sunday;
            newUser.value = false;
            id.value = change.doc.id;
          }
        });
      });
  },
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
