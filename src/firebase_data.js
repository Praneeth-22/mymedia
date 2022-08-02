// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBxyK-9VjVoPFWYUG7dgh-BtC-caHsLcCA",
    authDomain: "my-media-262b2.firebaseapp.com",
    projectId: "my-media-262b2",
    storageBucket: "my-media-262b2.appspot.com",
    messagingSenderId: "699870580852",
    appId: "1:699870580852:web:b401ab9be7becf46914121",
    measurementId: "G-29YNY4K9G3"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore()
  const auth=firebase.auth()
  const provider=new firebase.auth.GoogleAuthProvider()
  const storage=firebase.storage()

  export {auth,provider,storage}
  export default db;