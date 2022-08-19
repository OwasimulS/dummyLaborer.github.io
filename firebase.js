import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  getDatabase, //get my database
  ref, // refrence for spefic parts of your databse
  push, // generates a very unqiue
  set, // adds things to our database
  onValue, // shows things in ourdatabase
  update,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

// Your web app's Firebase configuration
//ENTER FIREBASE CONFIG HERE!!!
const firebaseConfig = {
  apiKey: "AIzaSyDFxe5P_73dJrAPgANmxvPERr1dvSqDXWk",
  authDomain: "demodayproject-62c77.firebaseapp.com",
  projectId: "demodayproject-62c77",
  storageBucket: "demodayproject-62c77.appspot.com",
  messagingSenderId: "365028356470",
  appId: "1:365028356470:web:9855e06750e9cedf380a57",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database, ref, push, set, onValue, update };
