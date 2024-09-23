import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { FIRESTORE_COLLECTION_USERS } from "../FIREBASE";

export const handleUserLastLogin = () => {
  const updateUserLastLogin = async (userId) => {
    const usersCollection = FIRESTORE_COLLECTION_USERS;
    const userRef = doc(usersCollection, userId);

    const data = {
      terakhir_login: serverTimestamp(),
    };
    updateDoc(userRef, data)
      .then(() => {
        console.log("Berhasil mengupdate data terakhir login");
      })
      .catch((error) => {
        console.log("Gagal mengupdate data user", error);
      });
  };
  return {
    updateUserLastLogin,
  };
};
