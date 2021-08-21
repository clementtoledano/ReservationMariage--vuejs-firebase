import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import "tailwindcss/tailwind.css";
import "./index.css";
import './assets/tailwind.css'

/* code from our Firebase console */
const firebaseConfig = {
  apiKey: "AIzaSyBlox2jgRIewD2yNIUii3gBIRyvUgWE74c",
  authDomain: "mariage-e3359.firebaseapp.com",
  projectId: "mariage-e3359",
  storageBucket: "mariage-e3359.appspot.com",
  messagingSenderId: "957088805430",
  appId: "1:957088805430:web:41e7fa21d24c4e15a1de97",
  measurementId: "G-V23KXZECDQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
