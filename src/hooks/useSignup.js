import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useContext } from "react";
import { GlobalContext } from "../context/useGlobalContext";

function useSignup() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const { dispatch } = useContext(GlobalContext);
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        dispatch({ type: "SIGN_IN", payload: user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const signupWithPasswordAndEmail = (name,photo, email, password) => {
    console.log(photo);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser,{
          displayName:name,
          photoURL:photo,

        })
        const user = userCredential.user;
        dispatch({type:"SIGN_IN", payload:user})
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        
      });
  };
  return { signUpWithGoogle, signupWithPasswordAndEmail, user, error };
}

export { useSignup };
