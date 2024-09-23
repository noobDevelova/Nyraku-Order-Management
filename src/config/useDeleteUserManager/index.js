import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_COLLECTION_USERS } from "../FIREBASE";

export const useDeleteUserManager = () => {
  const deleteUserData = async (userId) => {
    try {
      const userRef = doc(FIRESTORE_COLLECTION_USERS, userId);
      await deleteDoc(userRef);
    } catch (error) {
      console.log("Gagal menghapus user");
    }
  };
  return { deleteUserData };
};
