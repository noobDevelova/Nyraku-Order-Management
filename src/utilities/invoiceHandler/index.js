import { captureRef } from "react-native-view-shot";
export const captureInvoiceHandler = () => {
  const captureInvoice = async (capturedRef, setImage) => {
    try {
      const resultImg = await captureRef(capturedRef);
      console.log(resultImg);
      setImage(resultImg);
      return resultImg;
    } catch (error) {
      console.log("Gagal ss invoice", error);
    }
  };
  return {
    captureInvoice,
  };
};
