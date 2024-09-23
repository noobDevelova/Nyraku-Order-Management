import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_COLLECTION_USERS } from "../FIREBASE";
export const userCreateUserManager = () => {
  const auth = FIREBASE_AUTH;
  const signUp = async (email, password, data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Success Create User!", response);

      const rawData = {
        user_id: response.user.uid,
        username: data.username,
        email: data.email,
        jenis_kelamin: data.jenis_kelamin,
        role: data.role,
        terakhir_login: data.terakhir_login,
      };
      const userRef = doc(FIRESTORE_COLLECTION_USERS, response.user.uid);
      await setDoc(userRef, rawData);
      console.log("User data added!", response.user.uid);
    } catch (error) {
      console.log(error);
      console.log("Sign Up Failed");
      throw error;
    } finally {
      auth.signOut();
    }
  };

  return {
    signUp,
  };
};
