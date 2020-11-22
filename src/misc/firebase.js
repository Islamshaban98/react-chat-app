import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyA2r8cMVcimypkFhu7EHQeG5qXXx15wFbc',
  authDomain: 'chat-web-app-3a029.firebaseapp.com',
  databaseURL: 'https://chat-web-app-3a029.firebaseio.com',
  projectId: 'chat-web-app-3a029',
  storageBucket: 'chat-web-app-3a029.appspot.com',
  messagingSenderId: '988873562018',
  appId: '1:988873562018:web:e04f2b41d3122d3c9f84fb',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
