import firebase from "firebase";

export default {
  async getConfirmationId(
    id,
    user,
    lastname,
    firstname,
    phone,
    address,
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
            phone.value = data.phone;
            address.value = data.address;
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
  async create(
    lastname,
    firstname,
    phone,
    address,
    adult,
    children,
    message,
    sunday
  ) {
    return await firebase
      .firestore()
      .collection("confirmation")
      .add({
        userEmail: firebase.auth().currentUser.email,
        lastname: lastname.value,
        firstname: firstname.value,
        phone: phone.value,
        address: address.value,
        adult: adult.value,
        children: children.value,
        message: message.value,
        sunday: sunday.value,
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
    lastname,
    firstname,
    phone,
    address,
    adult,
    children,
    message,
    sunday
  ) {
    await firebase
      .firestore()
      .collection("confirmation")
      .doc(id.value)
      .update({
        lastname: lastname.value,
        firstname: firstname.value,
        phone: phone.value,
        address: address.value,
        adult: adult.value,
        children: children.value,
        message: message.value,
        sunday: sunday.value,
      })
      .then(() => {
        alert("Votre confirmation a été mise à jour!");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
