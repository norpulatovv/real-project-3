import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAd4zdgEs3ynMscd7oS0ocQqa8gszS-9zo",
    authDomain: "pro-practise-3.firebaseapp.com",
    projectId: "pro-practise-3",
    storageBucket: "pro-practise-3.firebasestorage.app",
    messagingSenderId: "492757661544",
    appId: "1:492757661544:web:a86b5c1f9774cf3d1508dd",
    measurementId: "G-GF72XSRRTE"
  };

// Firebase ni boshlash
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Facebook Provider
const facebookProvider = new FacebookAuthProvider();

// Google bilan kirish
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google kirish xatosi:', error);
    throw error;
  }
};

// Facebook bilan kirish
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    console.error('Facebook kirish xatosi:', error);
    throw error;
  }
};

// Chiqish
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Chiqish xatosi:', error);
    throw error;
  }
};

export { auth };