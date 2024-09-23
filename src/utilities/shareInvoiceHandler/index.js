import * as Sharing from "expo-sharing";
export const shareInvoiceHandler = () => {
  const shareInvoice = async (image, recipient) => {
    try {
      await Sharing.shareAsync("file://" + image);
    } catch (error) {
      console.log(error);
    }
  };
  return { shareInvoice };
};
