import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_COLLECTION_ORDER } from "../FIREBASE";

export const useUpdateOrderManager = () => {
  const updateData = async (docId, updatedData) => {
    const db = FIRESTORE_COLLECTION_ORDER;
    const documentRef = doc(db, docId);

    try {
      await setDoc(documentRef, updatedData)
        .then((documentRef) => {
          console.log("Success Updated", documentRef);
        })
        .catch((error) => {
          console.log("error update", error);
        });
    } catch (error) {
      console.log("Terjadi kesalahan saat memperbaharui data", error);
      return false;
    }
  };
  return {
    updateData,
  };
};
