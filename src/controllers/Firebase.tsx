import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGOdFT4ugf2XYCbnVb798BSHWGSvaO_YA",
    authDomain: "quicklink-fd10a.firebaseapp.com",
    projectId: "quicklink-fd10a",
    storageBucket: "quicklink-fd10a.appspot.com",
    messagingSenderId: "491957899687",
    appId: "1:491957899687:web:2e97088fad21df8b446682"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(((result) => {
        console.log(result)
    })).catch((error) => {
        console.log(error)
    });

}