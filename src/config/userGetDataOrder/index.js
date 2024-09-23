import { getDocs, onSnapshot } from "firebase/firestore";
import { FIRESTORE_COLLECTION_ORDER } from "../FIREBASE";

export const useGetDataOrder = (updateOrderList) => {
  const fetchOrder = async () => {
    try {
      const collectionRef = FIRESTORE_COLLECTION_ORDER;
      const querySnapshot = await getDocs(collectionRef);
      const orderData = querySnapshot.docs.map((doc) => doc.data());
      return orderData;
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToOrder = () => {
    const collectionRef = FIRESTORE_COLLECTION_ORDER;
    onSnapshot(collectionRef, (querySnapshot) => {
      const orderData = querySnapshot.docs.map((doc) => doc.data());
      // Panggil fungsi atau ubah state yang relevan di sini
      updateOrderList(orderData);
      // Misalnya, fungsi untuk memperbarui state orderList di komponen parent
    });
  };

  return { fetchData: fetchOrder, subscribeToData: subscribeToOrder };
};
