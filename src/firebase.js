import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDzfgviI5zv9jMfq7s4Pot-890OEKU-n_s',
  authDomain: 'gowthami-florist.firebaseapp.com',
  projectId: 'gowthami-florist',
  storageBucket: 'gowthami-florist.firebasestorage.app',
  messagingSenderId: '600494179920',
  appId: '1:600494179920:web:0972b1ceed112a1b0c3355',
  measurementId: 'G-ZTX6WZDK2Z',
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
