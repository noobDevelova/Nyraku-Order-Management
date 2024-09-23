import { doc, getDoc } from "firebase/firestore";
import {
  FIRESTORE_COLLECTION_HISTORY,
  FIRESTORE_COLLECTION_ORDER,
} from "../FIREBASE";

export const generateUniqueOrderKey = async () => {
  const collectionRef = FIRESTORE_COLLECTION_ORDER;
  const historyRef = FIRESTORE_COLLECTION_HISTORY;
  const keyPrefix = "NCP-";
  let uniqueNum = 1;
  let key = keyPrefix + uniqueNum.toString().padStart(4, "0");

  let snapshot = await getDoc(doc(collectionRef, key));
  let historySnapshot = await getDoc(doc(historyRef, key));

  if (snapshot.exists()) {
    while (snapshot.exists() || historySnapshot.exists()) {
      uniqueNum++;
      key = keyPrefix + uniqueNum.toString().padStart(4, "0");
      snapshot = await getDoc(doc(collectionRef, key));
      historySnapshot = await getDoc(doc(historyRef, key));
    }
  } else {
    while (snapshot.exists() || historySnapshot.exists()) {
      uniqueNum++;
      key = keyPrefix + uniqueNum.toString().padStart(4, "0");
      snapshot = await getDoc(doc(collectionRef, key));
      historySnapshot = await getDoc(doc(historyRef, key));
    }
  }

  return key;
};
