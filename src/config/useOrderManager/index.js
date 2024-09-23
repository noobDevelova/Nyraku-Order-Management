import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_COLLECTION_ORDER } from "../FIREBASE";

export const userUploadOrderManager = () => {
  const uploadData = async (data) => {
    try {
      const collection = FIRESTORE_COLLECTION_ORDER;
      const documentRef = doc(collection, data.order_id);

      setDoc(documentRef, data)
        .then(() => {
          console.log("Data pesanan berhasil diunggah", data);
        })
        .catch((error) => {
          console.log("Data gagal diunggah ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    uploadData,
  };
};
