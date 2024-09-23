import { getDocs, onSnapshot } from "firebase/firestore";
import { FIRESTORE_COLLECTION_HISTORY } from "../FIREBASE";

export const useGetHistoryOrder = (updateOrderList) => {
  const fetchHistory = async () => {
    try {
      const collectionRef = FIRESTORE_COLLECTION_HISTORY;
      const querySnapshot = await getDocs(collectionRef);
      const historyData = querySnapshot.docs.map((doc) => doc.data());
      return historyData;
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToHistory = () => {
    const collectionRef = FIRESTORE_COLLECTION_HISTORY;
    onSnapshot(collectionRef, (querySnapshot) => {
      const historyData = querySnapshot.docs.map((doc) => doc.data());
      // Panggil fungsi atau ubah state yang relevan di sini
      updateOrderList(historyData);
      // Misalnya, fungsi untuk memperbarui state orderList di komponen parent
    });
  };

  return { fetchHistory: fetchHistory, subscribeToHistory: subscribeToHistory };
};
