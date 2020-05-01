import firebase from 'firebase';

let firebaseConfig = {
  apiKey: 'AIzaSyAfsdRO5FZ3qMv_UUTpXgKpFUtjlbvHXNw',
  authDomain: 'pubquiz-8b560.firebaseapp.com',
  databaseURL: 'https://pubquiz-8b560.firebaseio.com',
  projectId: 'pubquiz-8b560',
  storageBucket: 'pubquiz-8b560.appspot.com',
  messagingSenderId: '880998659466',
  appId: '1:880998659466:web:be0f38864a23053daf8473',
  measurementId: 'G-HZFT243DSH',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();

export default {
  firebase,
  db,
};
