import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_COLLECTION_USERS } from "../FIREBASE";

export const useGetUserData = () => {
  const getUserData = async (uid) => {
    try {
      const userRef = doc(FIRESTORE_COLLECTION_USERS, uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        throw new Error("Data user tidak ditemukan");
      }
    } catch (error) {
      console.log("Gagal mengambil data", error);
      throw error;
    }
  };
  return { getUserData };
};
