import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '~/config'

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase)
}

export const Auth = firebase.auth
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
