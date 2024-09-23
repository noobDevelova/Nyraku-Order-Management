import { getDocs, onSnapshot } from "firebase/firestore";
import { FIRESTORE_COLLECTION_USERS } from "../FIREBASE";
export const useGetAllUserData = (updateUsersList) => {
  const fetchUsers = async () => {
    try {
      const collectionRef = FIRESTORE_COLLECTION_USERS;
      const querySnapshot = await getDocs(collectionRef);
      const usersData = querySnapshot.docs.map((doc) => doc.data());
      return usersData;
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToUsers = () => {
    const collectionRef = FIRESTORE_COLLECTION_USERS;
    onSnapshot(collectionRef, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => doc.data());
      // Panggil fungsi atau ubah state yang relevan di sini
      updateUsersList(usersData);
      // Misalnya, fungsi untuk memperbarui state orderList di komponen parent
    });
  };

  return { fetchUsers: fetchUsers, subscribeToUsers: subscribeToUsers };
};
