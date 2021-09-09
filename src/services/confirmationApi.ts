import Confirmation from "@/types/Confirmation";
import firebase from "firebase";

const db = firebase.firestore();

const getAllConfirmationForAdmin = async () => {
  return db
    .collection("confirmation")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

const getAllConfirmation = () => {
  const getCollection = db.collection("confirmation");

  return getCollection.get().then((snapshot) => {
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
};

const create = async (data: Confirmation) => {
  return await db.collection("confirmation").add({
    userEmail: firebase.auth().currentUser?.email,
    lastname: data.lastname,
    firstname: data.firstname,
    phone: data.phone,
    address: data.address,
    adult: data.adult,
    children: data.children,
    message: data.message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const update = async (id: string, data: Confirmation) => {
  return await db.collection("confirmation").doc(id).update({
    lastname: data.lastname,
    firstname: data.firstname,
    phone: data.phone,
    address: data.address,
    adult: data.adult,
    children: data.children,
    message: data.message,
    updateAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
export default {
  getAllConfirmationForAdmin,
  getAllConfirmation,
  create,
  update,
};
