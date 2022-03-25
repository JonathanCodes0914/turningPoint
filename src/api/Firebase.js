import firebase from 'firebase';
import 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDUr2E2V-gjSPjvS7iHfPY0nttf0Cg1Vek",
  authDomain: "social-2dece.firebaseapp.com",
  projectId: "social-2dece",
  storageBucket: "social-2dece.appspot.com",
  messagingSenderId: "358926914892",
  appId: "1:358926914892:web:d1ac4c51f493bf608c2be9",
  measurementId: "G-6QTPKCP6MC"
};


firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();
export { storage };
