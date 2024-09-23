import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../FIREBASE";

export const userForgotPasswordManager = () => {
  const resetPassword = async (email, setErr) => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      console.log("Email reset password sudah terkirim");
    } catch (error) {
      if (error) {
        setErr("Email tidak ditemukan");
      }
    }
  };
  return {
    resetPassword,
  };
};
