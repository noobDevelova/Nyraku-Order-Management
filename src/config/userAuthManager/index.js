import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_COLLECTION_USERS } from "../FIREBASE";

export const useAuthManager = () => {
  const auth = FIREBASE_AUTH;
  const usersDB = FIRESTORE_COLLECTION_USERS;
  const signIn = async (email, password, errEmail, errPass) => {
    try {
      const querySnapshot = await getDocs(
        query(usersDB, where("email", "==", email))
      );
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.user_id) {
          const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("Success Logged In!", response);
        } else {
          errEmail("Email tidak ditemukan!");
        }
      } else {
        errEmail("Email tidak ditemukan!");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        errEmail("Email tidak ditemukan!");
        console.log("memek");
      } else if (error.code === "auth/wrong-password") {
        errPass("Password anda salah!");
      } else {
        console.log("Error", error);
      }
    }
  };

  return {
    signIn,
  };
};
