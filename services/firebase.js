import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyA1frqipSZPFk61yfDQ9-uGSYXDuwxqdAg',
    authDomain: 'geounity.firebaseapp.com',
    databaseURL: 'https://geounity.firebaseio.com',
    projectId: 'geounity',
    storageBucket: 'geounity.appspot.com',
    messagingSenderId: '675273107835',
    appId: '1:675273107835:web:782de361cc4c04f0'
  }
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
