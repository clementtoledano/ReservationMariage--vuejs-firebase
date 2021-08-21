import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";

import "tailwindcss/tailwind.css";
import "./assets/tailwind.css";

/* code from our Firebase console */
const firebaseConfig = {
  apiKey: process.env.VUE_APP_BASE_APIKEY,
  authDomain: process.env.VUE_APP_BASE_AUTHDOMAIN,
  projectId: process.env.VUE_APP_BASE_PROJECTID,
  storageBucket: process.env.VUE_APP_BASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_BASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_BASE_APPID,
  measurementId: process.env.VUE_APP_BASE_MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
