import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_COLLECTION_HISTORY } from "../FIREBASE";
export const useDeleteHistory = () => {
  const deleteData = async (dataId) => {
    try {
      const historyCollection = FIRESTORE_COLLECTION_HISTORY;
      const docRef = doc(historyCollection, dataId);
      await deleteDoc(docRef);
    } catch (error) {
      console.log("Gagal menghapus data", error);
    }
  };

  return { deleteData };
};
