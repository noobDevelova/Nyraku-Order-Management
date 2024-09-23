import { deleteDoc, doc, setDoc } from "firebase/firestore";
import {
  FIRESTORE_COLLECTION_HISTORY,
  FIRESTORE_COLLECTION_ORDER,
} from "../FIREBASE";

export const userCheckoutOrderManager = () => {
  const checkOutOrder = async (data, id) => {
    const db = FIRESTORE_COLLECTION_ORDER;
    const historyRef = doc(FIRESTORE_COLLECTION_HISTORY, id);
    const documentRef = doc(db, id);
    try {
      setDoc(historyRef, data)
        .then(() => {
          console.log("Data berhasil di checkout");
        })
        .catch((error) => {
          console.log("Data gagal di checkout", error);
        });
      await deleteDoc(documentRef);
    } catch (error) {
      console.log("Gagal checkout", error);
    }
  };
  return {
    checkOutOrder,
  };
};
