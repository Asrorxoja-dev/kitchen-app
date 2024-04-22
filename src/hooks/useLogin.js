import { auth } from "../firebase/fireBaseConfig";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/useGlobalContext";
import { signInWithEmailAndPassword as signIn } from "firebase/auth";


function useLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(GlobalContext);

  const signInWithEmailAndPassword = (email, password) => {
    signIn( auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "SIGN_IN", payload: user });
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return { signInWithEmailAndPassword, user, error };
}

export default useLogin;
